import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../database/sequelize/model/customer.model";
import OrderModel from "../database/sequelize/model/order.model";
import OrderItemModel from "../database/sequelize/model/order_item.model";
import ProductModel from "../database/sequelize/model/product.model";
import CustomerRepositorySequelize from "./customer.repository.sequelize";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import ProductRepositorySequelize from "./product.repository.sequelize";
import Product from "../../domain/entity/product";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositorySequelize from "./order.repository.sequelize";

describe("Order Repository [Sequelize] Tests", () => {
    let sequelize: Sequelize;
    let orderRepository: OrderRepositorySequelize;

    beforeEach(async () =>{
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: true,
            sync: {force: true},
            models: [
                CustomerModel,
                ProductModel,
                OrderModel,
                OrderItemModel,
            ]
        });
        
        //OrderModel.hasMany(OrderItemModel, { foreignKey: 'order_id', as: 'items' });
        //OrderItemModel.belongsTo(OrderModel, { foreignKey: 'order_id', as: 'order' });
        await sequelize.sync();
        orderRepository = new OrderRepositorySequelize();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        // Configurações iniciais de repositórios
        const customerRepository = new CustomerRepositorySequelize();
        const productRepository = new ProductRepositorySequelize();
        
        // Inicialização de entidades
        const address = new Address("Street", "00123", "99999999", "City");
        const customer = new Customer("1", "Name", "12345678910", address);
        await customerRepository.create(customer);
    
        const product = new Product("1", "Product 1", 9.97);
        await productRepository.create(product);
    
        const item1 = new OrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("1", customer.id, [item1]);
    
        // Criação da ordem
        await orderRepository.create(order);
    
        // Testa a criação da ordem
        const orderSearch = await orderRepository.findById(order.id);
    
        // Validações de Order
        expect(orderSearch).toBeTruthy();
        expect(orderSearch.id).toBe(order.id);
        expect(orderSearch.customerId).toBe(order.customerId);
        expect(orderSearch.total()).toBe(order.total());
    
        // Validações de OrderItem
        expect(orderSearch.items.length).toBe(order.items.length);
        
        const searchedItem = orderSearch.items[0];
        expect(searchedItem.id).toBe(item1.id);
        expect(searchedItem.name).toBe(item1.name);
        expect(searchedItem.price).toBe(item1.price);
        expect(searchedItem.productId).toBe(item1.productId);
        expect(searchedItem.quantity).toBe(item1.quantity);
        expect(searchedItem.total()).toBe(item1.total());
    });
    
    it("should update an existing order", async () => {
        // Configurações iniciais de repositórios
        const customerRepository = new CustomerRepositorySequelize();
        const productRepository = new ProductRepositorySequelize();
        
        // Criação e persistência de dados iniciais
        const address = new Address("Street", "00123", "99999999", "City");
        const customer = new Customer("1", "Name", "12345678910", address);
        await customerRepository.create(customer);
    
        const product = new Product("1", "Product 1", 9.97);
        await productRepository.create(product);
    
        // Pedido original
        const item1 = new OrderItem("1", product.name, product.price, product.id, 2);
        const order = new Order("1", customer.id, [item1]);
        await orderRepository.create(order);
    
        // Validações iniciais
        let orderSearch = await orderRepository.findById(order.id);
        expect(orderSearch.total()).toBe(order.total());
    
        // Atualização dos itens do pedido
        const updatedItem = new OrderItem("1", product.name, product.price, product.id, 3); // Alterando quantidade para 3
        const updatedOrder = new Order(order.id, customer.id, [updatedItem]);
        await orderRepository.update(updatedOrder);
    
        // Recuperação e validação do pedido atualizado
        orderSearch = await orderRepository.findById(order.id);
    
        // Verificação de Order e OrderItem atualizados
        expect(orderSearch).toBeTruthy();
        expect(orderSearch.id).toBe(order.id);
        expect(orderSearch.total()).toBe(updatedOrder.total());
    
        // Verificar itens atualizados
        expect(orderSearch.items.length).toBe(updatedOrder.items.length);
        expect(orderSearch.items[0].quantity).toBe(3);  // Quantidade atualizada
        expect(orderSearch.items[0].total()).toBe(updatedItem.total());
    });

    it("should throw an error if order not found by id", async () => {
        // Act & Assert
        await expect(orderRepository.findById("non-existent-id"))
            .rejects
            .toThrow("Order not found");
    });

    it("should find all orders", async () => {
        // Configurações iniciais de repositórios
        const customerRepository = new CustomerRepositorySequelize();
        const productRepository = new ProductRepositorySequelize();
        
        // Inicialização de entidades
        const address = new Address("Street", "00123", "99999999", "City");
        const customer = new Customer("1", "Name", "12345678910", address);
        await customerRepository.create(customer);
    
        const product1 = new Product("1", "Product 1", 9.97);
        await productRepository.create(product1);
        const product2 = new Product("2", "Product 2", 19.99);
        await productRepository.create(product2);
    
        // Arrange
        const item1 = new OrderItem("1", product1.name, product1.price, product1.id, 2);
        const order1 = new Order("1", customer.id, [item1]);
        await orderRepository.create(order1);
        
        const item2 = new OrderItem("2", product2.name, product2.price, product2.id, 2);
        const order2 = new Order("2", customer.id, [item2]);
        await orderRepository.create(order2);

        // Act
        const orders = await orderRepository.findAll();

        // Assert
        expect(orders).toHaveLength(2);
        expect(orders[0].id).toBe(order1.id);
        expect(orders[1].id).toBe(order2.id);
    });

    it("should throw an error if no orders found", async () => {
        // Act & Assert
        await expect(orderRepository.findAll())
            .rejects
            .toThrow("No orders found");
    });
    
    
});