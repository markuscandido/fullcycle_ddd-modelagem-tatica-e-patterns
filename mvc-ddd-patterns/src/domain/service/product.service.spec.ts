import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {
    it("Should throw an exception when percentage of increase is invalid", () => {
        const product1 = new Product("1", "Product One", 10.0);
        const product2 = new Product("2", "Product Two", 21.50);
        const products = [product1, product2];

        expect(() => {
            ProductService.increasePrice(products, 0);
        }).toThrow("Percentage of increase must be greater than zero");

        expect(() => {
            ProductService.increasePrice(products, -2.75);
        }).toThrow("Percentage of increase must be greater than zero");
    });

    it("Should throw an exception when the product list is empty", () => {
        expect(() => {
            ProductService.increasePrice([], 10);
        }).toThrow("Products list cannot be null or empty");
    });

    it("Should change the prices of all products", () => {
        const product1 = new Product("1", "Product One", 10.0);
        const product2 = new Product("2", "Product Two", 21.50);
        const products = [product1, product2];

        ProductService.increasePrice(products, 10.0);

        expect(product1.price).toBe(11.0);
        expect(product2.price).toBe(23.65);
    });

    it("Should handle large percentage increase correctly", () => {
        const product1 = new Product("1", "Product One", 10.0);
        const products = [product1];

        ProductService.increasePrice(products, 200.0);

        expect(product1.price).toBe(30.0);  // triplicando o preço
    });

    it("Should handle decimal percentage increase correctly", () => {
        const product1 = new Product("1", "Product One", 10.0);
        const product2 = new Product("2", "Product Two", 21.50);
        const products = [product1, product2];

        ProductService.increasePrice(products, 2.5);

        expect(product1.price).toBeCloseTo(10.25, 2);
        expect(product2.price).toBeCloseTo(22.03, 2);
    });
});