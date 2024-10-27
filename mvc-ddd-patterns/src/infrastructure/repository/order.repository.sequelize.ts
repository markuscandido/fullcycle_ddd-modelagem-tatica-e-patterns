import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import IOrderRepository from "../../domain/repository/order.repository.interface";
import OrderModel from "../database/sequelize/model/order.model";
import OrderItemModel from "../database/sequelize/model/order_item.model";

export default class OrderRepositorySequelize implements IOrderRepository{
    
    async create(entity: Order): Promise<void> {
        await OrderModel.create(this.toPersistenceObject(entity), {include: [{model: OrderItemModel}]});
    }

    async update(entity: Order): Promise<void> {
        const persistenceObject = this.toPersistenceObject(entity);
        const { id, items, ...entityData } = persistenceObject;

        // Atualiza a ordem sem os itens
        await OrderModel.update(entityData, { where: { id } });

        // Remove itens antigos e insere os novos
        await OrderItemModel.destroy({ where: { order_id: id } });
        await OrderItemModel.bulkCreate(items.map((item: any) => ({ ...item, order_id: id })));
    }

    async findById(id: string): Promise<Order> {
        const orderModel = await OrderModel.findByPk(id, {include: ["items"]});
        if(orderModel == null){
            throw new Error("Order not found");
        }

        return this.orderBuilder(orderModel);
    }
    
    async findAll(): Promise<Order[]> {
        const modelList = await OrderModel.findAll({include: ["items"]});
        // Verifica se a lista está vazia
        if (modelList.length === 0) {
            throw new Error("No orders found");
        }
        
        // Mapeia cada customerModel para um Customer
        const orderList: Order[] = modelList
        //.filter(customerModel => customerModel) // Garante que customerModel não seja null ou undefined
        .map(orderModel => {
            return this.orderBuilder(orderModel) as Order;
        });

        return orderList;

    }

    private orderBuilder(orderModel: OrderModel): Order {
        const order = new Order(
            orderModel.id,
            orderModel.customer_id,
            orderModel.items.map(orderItemModel => {return this.orderItemBuilder(orderItemModel) as OrderItem})
        );
        
        return order;
    }

    private orderItemBuilder(orderItemModel: OrderItemModel): OrderItem {
        const item = new OrderItem(
            orderItemModel.id,
            orderItemModel.name,
            orderItemModel.price,
            orderItemModel.product_id,
            orderItemModel.quantity
        );
        
        return item;
    }

    private toPersistenceObject(entity: Order): any {
        return {
            id: entity.id,
            customer_id: entity.customerId,
            items: entity.items.map((item) => ({
                id: item.id,
                order_id: entity.id,
                product_id: item.productId,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                total: item.total()
            })),
            total: entity.total()
        };
    }


}