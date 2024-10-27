import Address from "./address";

describe('Address unit tests', () => {

    it("Should throw error when street is empty/blank", () => {
        
        expect(() => {
            new Address("", "", "", "");
        }).toThrow("Address::Street is required");

        expect(() => {
            new Address("  ", "", "", "");
        }).toThrow("Address::Street is required");

    });

    it("Should throw error when number is empty/blank", () => {
        
        expect(() => {
            new Address("Street One", "", "", "");
        }).toThrow("Address::Number is required");

        expect(() => {
            new Address("Street One", " ", "", "");
        }).toThrow("Address::Number is required");

    });

    it("Should throw error when zip is empty/blank", () => {
        
        expect(() => {
            new Address("Street One", "33", "", "");
        }).toThrow("Address::Zip is required");

        expect(() => {
            new Address("Street One", "33", " ", "");
        }).toThrow("Address::Zip is required");

    });

    it("Should throw error when city is empty/blank", () => {
        
        expect(() => {
            new Address("Street One", "33", "99999-999", "");
        }).toThrow("Address::City is required");

        expect(() => {
            new Address("Street One", "33", "99999-999", " ");
        }).toThrow("Address::City is required");

    });

    it("Should create address", () => {
        
        const address = new Address("Street One", "123", "99999-999", "City");

        expect(address.street).toBe("Street One");
        expect(address.number).toBe("123");
        expect(address.zip).toBe("99999-999");
        expect(address.city).toBe("City");

        const addressToString = "Street One, 123, 99999-999 City"
        expect(address.toString()).toBe(addressToString);

    });

});