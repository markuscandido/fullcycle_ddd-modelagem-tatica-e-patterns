import Product from "./product";

describe('Product unit tests', () => {

    it("Should throw error when id is empty/blank", () => {
        expect(() => {
            new Product("", "", 0);
        }).toThrow("Product::Id is required");

        expect(() => {
            new Product(" ", "", 0);
        }).toThrow("Product::Id is required");
    });

    it("Should throw error when name is empty/blank", () => {
        expect(() => {
            new Product("1", "", 0);
        }).toThrow("Product::Name is required");

        expect(() => {
            new Product("1", " ", 0);
        }).toThrow("Product::Name is required");
    });

    it("Should throw error when price is invalid", () => {
        expect(() => {
            new Product("1", "Product One", -5.99);
        }).toThrow("Product::Price must be greater than zero");

        expect(() => {
            new Product("1", "Product One", 0);
        }).toThrow("Product::Price must be greater than zero");
    });

    it("Should create a product", () => {
        const product = new Product("1", "Product One", 9.99);
        expect(product.id).toBe("1");
        expect(product.name).toBe("Product One");
        expect(product.price).toBe(9.99);
    });

    it("Should change name product", () => {
        const product = new Product("1", "Product One", 9.99);
        expect(product.name).toBe("Product One");
        
        product.changeName("Product One - Changed");

        expect(product.name).toBe("Product One - Changed");

    });

    it("Should change price product", () => {
        const product = new Product("1", "Product One", 9.99);
        expect(product.price).toBe(9.99);
        
        product.changePrice(19.97);

        expect(product.price).toBe(19.97);

    });

});