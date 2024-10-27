import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import ICustomerRepository from "../../domain/repository/customer.repository.interface";
import CustomerModel from "../database/sequelize/model/customer.model";

export default class CustomerRepositorySequelize implements ICustomerRepository{
    
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create(this.toPersistenceObject(entity));
    }

    async update(entity: Customer): Promise<void> {
        const { id, ...entityData } = this.toPersistenceObject(entity);
        await CustomerModel.update(entityData, {where: {id: entity.id}});
    }

    async findById(id: string): Promise<Customer> {
        const customerModel = await CustomerModel.findByPk(id);
        if(customerModel == null){
            throw new Error("Customer not found");
        }

        return this.customerBuilder(customerModel);
    }
    
    async findAll(): Promise<Customer[]> {
        const customerModelList = await CustomerModel.findAll();
        // Verifica se a lista está vazia
        if (customerModelList.length === 0) {
            throw new Error("No customers found");
        }
        
        // Mapeia cada customerModel para um Customer
        const customerList: Customer[] = customerModelList
        //.filter(customerModel => customerModel) // Garante que customerModel não seja null ou undefined
        .map(customerModel => {
            return this.customerBuilder(customerModel) as Customer;
        });

        return customerList;

    }

    private customerBuilder(customerModel: CustomerModel) {
        // Verifica se todas as propriedades de endereço são válidas
        const isAddressValid = customerModel?.street && customerModel?.number && customerModel?.zipcode && customerModel?.city;
        // Se qualquer propriedade estiver vazia, address será undefined
        const address = isAddressValid
            ? new Address(
                customerModel.street,
                customerModel.number,
                customerModel.zipcode,
                customerModel.city
            )
            : undefined;

        const customer = new Customer(
            customerModel.id,
            customerModel.name,
            customerModel.document,
            address,
            customerModel.active,
            customerModel.rewardPoints
        );
        
        return customer;
    }

    private toPersistenceObject(entity: Customer): any {
        return {
            id: entity.id,
            name: entity.name,
            document: entity.document,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
			//#region Address
            street: entity.Address?.street,
            number: entity.Address?.number,
            zipcode: entity.Address?.zip,
            city: entity.Address?.city
			//#endregion
        };
    }

}