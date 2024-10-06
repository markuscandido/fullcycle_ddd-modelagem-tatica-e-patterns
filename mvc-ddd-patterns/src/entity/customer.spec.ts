import Address from "./address";
import Customer from "./customer";

describe('Customer unit tests', () => {

    it("Should throw error when Customer_Id is empty", () => {
        
        expect(() => {
            new Customer("", "")
        }).toThrow("Id is required");

        expect(() => {
            new Customer(" ", "")
        }).toThrow("Id is required");

    });

    it("Should throw error when Customer_Name is empty", () => {
        expect(() => {
            new Customer("1", "")
        }).toThrow("Name is required");

        expect(() => {
            new Customer("1", " ")
        }).toThrow("Name is required");

    });

    it("Should change name", () => {
        let customer = new Customer("1", "Customer 1");
        expect(customer.id).toBe("1");
        expect(customer.name).toBe("Customer 1");

        customer.changeName("Customer Name Changed");

        expect(customer.id).toBe("1");
        expect(customer.name).toBe("Customer Name Changed");
    });

    it("Should throw error when activated with less address", () => {
        const customer = new Customer("1", "Customer 1");

        expect(() => {
            customer.activate()
        }).toThrow("Address is mandatory to activate a customer");
        
    });

    it("Should activate customer", () => {
        const customer = new Customer("1", "Customer 1");
        
        expect(customer.isActive()).toBe(false);

        const address = new Address("Street", 999, "99999-999", "City");
        customer.changeAddress(address);
        expect(customer.isActive()).toBe(false);

        customer.activate();
        expect(customer.isActive()).toBe(true);
    });

    it("Should deactivate customer", () => {
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street", 999, "99999-999", "City");
        customer.changeAddress(address);
        customer.activate();
        
        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    });

});