import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../database/sequelize/model/customer.model";
import CustomerRepositorySequelize from "./customer.repository.sequelize";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";

describe("Customer Repository [Sequelize] Tests", () => {
    let sequileze: Sequelize;
    beforeEach(async () =>{
        sequileze = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: true,
            sync: {force: true}
        });

        sequileze.addModels([CustomerModel]);
        await sequileze.sync();
    });

    afterEach(async () => {
        await sequileze.close();
    });

    it("should create a customer", async () =>{
        const repository = new CustomerRepositorySequelize();
        const address = new Address("Street", "0033", "99999-999", "City");
        const newCustomer = new Customer("1", "Customer", "12345678910", address);

        await repository.create(newCustomer);

        const foundedCustomer = await repository.findById("1");
        expect(foundedCustomer).toBeTruthy();
        expect(foundedCustomer?.id).toEqual(newCustomer.id);
        expect(foundedCustomer?.name).toEqual(newCustomer.name);
        expect(foundedCustomer?.document).toEqual(newCustomer.document);
        
        expect(foundedCustomer.Address).toBeTruthy();
        expect(foundedCustomer?.Address?.street).toEqual(newCustomer.Address?.street);
        expect(foundedCustomer?.Address?.number).toEqual(newCustomer.Address?.number);
        expect(foundedCustomer?.Address?.zip).toEqual(newCustomer.Address?.zip);
        expect(foundedCustomer?.Address?.city).toEqual(newCustomer.Address?.city);
    });

    it("should update a customer", async () =>{
        const repository = new CustomerRepositorySequelize();
        const address = new Address("Street", "0033", "99999-999", "City");
        const newCustomer = new Customer("1", "Customer", "12345678910", address);

        await repository.create(newCustomer);
        const findCustomer = await repository.findById("1");
        
        findCustomer.changeName("Customer - Edited");
        
        await repository.update(findCustomer);
        
        const findCustomer2 = await repository.findById("1");

        expect(findCustomer2).toBeTruthy();
        expect(findCustomer2?.id).toEqual(findCustomer.id);
        expect(findCustomer2?.name).toEqual(findCustomer.name);
        expect(findCustomer2?.document).toEqual(findCustomer.document);
    });

    it("should find a customer by id", async () =>{
        const repository = new CustomerRepositorySequelize();
        const newCustomer = new Customer("1", "Customer", "12345678910");

        await repository.create(newCustomer);

        const foundedCustomer = await repository.findById("1");
        expect(foundedCustomer).toBeTruthy();
        expect(foundedCustomer?.id).toEqual(newCustomer.id);
        expect(foundedCustomer?.name).toEqual(newCustomer.name);
        expect(foundedCustomer?.document).toEqual(newCustomer.document);
        expect(foundedCustomer.Address).toBeFalsy();
    });

    it("should throw error when customer id not found", async () =>{
        const repository = new CustomerRepositorySequelize();
        const newCustomer = new Customer("1", "Customer", "12345678910");

        await repository.create(newCustomer);
        
        await expect(repository.findById("999"))
            .rejects
            .toThrow("Customer not found");
        
    });

    it("should throw error when no customers found", async () =>{
        const repository = new CustomerRepositorySequelize();
        
        await expect(repository.findAll())
            .rejects
            .toThrow("No customers found");
        
    });

    it("should find all product", async () =>{
        const repository = new CustomerRepositorySequelize();

        const customer1 = new Customer("1", "Customer 1", "12345678901");
        await repository.create(customer1);

        const customer2 = new Customer("2", "Customer 2", "12345678902");
        await repository.create(customer2);

        const customer3 = new Customer("3", "Customer 3", "12345678903");
        await repository.create(customer3);

        const customer4 = new Customer("4", "Customer 4", "12345678904");
        await repository.create(customer4);

        const customer5 = new Customer("5", "Customer 5", "12345678905");
        await repository.create(customer5);
                
        const customers = await repository.findAll();
        
        expect(customers).toHaveLength(5);
        expect(customers).toContainEqual(customer1);
        expect(customers).toContainEqual(customer3);
        expect(customers).toContainEqual(customer5);
        
    });
});