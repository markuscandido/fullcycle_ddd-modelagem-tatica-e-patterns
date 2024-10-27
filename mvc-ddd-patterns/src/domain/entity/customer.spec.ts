import Address from "./address";
import Customer from "./customer";

describe('Customer unit tests', () => {

    it("Should throw error when id is empty/blank", () => {
        
        expect(() => {
            new Customer("", "", "")
        }).toThrow("Customer::Id is required");

        expect(() => {
            new Customer(" ", "", "")
        }).toThrow("Customer::Id is required");

    });

    it("Should throw error when name is empty/blank", () => {
        expect(() => {
            new Customer("1", "", "")
        }).toThrow("Customer::Name is required");

        expect(() => {
            new Customer("1", " ", "")
        }).toThrow("Customer::Name is required");

    });

    it("Should throw error when document is empty/blank", () => {
        expect(() => {
            new Customer("1", "Name", "")
        }).toThrow("Customer::Document is required");

        expect(() => {
            new Customer("1", "Name", "")
        }).toThrow("Customer::Document is required");

    });

    it("Should change name", () => {
        let customer = new Customer("1", "Customer 1", "12345678910");
        expect(customer.id).toBe("1");
        expect(customer.name).toBe("Customer 1");

        customer.changeName("Customer Name Changed");

        expect(customer.id).toBe("1");
        expect(customer.name).toBe("Customer Name Changed");
    });

    it("Should change address", () => {
        const address = new Address("Street", "123", "99999-999", "City");
        let customer = new Customer("1", "Customer 1", "12345678910", address);
        expect(customer.Address).toBe(address);

        const newAddress = new Address("New Street", "999", "88888-888", "New City");
        customer.changeAddress(newAddress);

        expect(customer.Address).toBe(newAddress);
    });

    it("Should create customer", () => {
        const address = new Address("Street", "999", "99999-999", "City");
        const customer = new Customer("1", "Customer 1", "12345678910", address);
        customer.activate();
        
        expect(customer.isActive()).toBe(true);
        expect(customer.id).toBe("1");
        expect(customer.name).toBe("Customer 1");
        expect(customer.document).toBe("12345678910");
        
        expect(customer.Address).toEqual(address);
    });

    it("Should throw error when activated with less address", () => {
        expect(() => {
            const customer = new Customer("1", "Customer 1", "12345678910");
            customer.activate()
        }).toThrow("Address is mandatory to activate a customer");
        
    });

    it("Should activate customer", () => {
        const address = new Address("Street", "999", "99999-999", "City");
        const customer = new Customer("1", "Customer 1", "12345678910", address);
        
        expect(customer.isActive()).toBe(false);

        customer.activate();
        expect(customer.isActive()).toBe(true);
    });

    it("Should deactivate customer", () => {
        const address = new Address("Street", "999", "99999-999", "City");
        const customer = new Customer("1", "Customer 1", "12345678910", address);
        customer.activate();
        
        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    });

    it("Should throw error when reward points is less or equal to zero", () => {
        const customer = new Customer("1", "Customer 1", "12345678910");
        expect(() => {
            customer.addRewardPoints(0);
        }).toThrow("Points reward must be greater than 0");
        expect(() => {
            customer.addRewardPoints(-19);
        }).toThrow("Points reward must be greater than 0");
    });

    it("Should add reward points", () => {
        const customer = new Customer("1", "Customer 1", "12345678910");
        expect(customer.rewardPoints).toBe(0);
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);
        customer.addRewardPoints(9);
        expect(customer.rewardPoints).toBe(19);
    });

});