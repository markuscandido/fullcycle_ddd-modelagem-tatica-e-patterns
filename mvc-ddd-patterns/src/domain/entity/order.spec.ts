import Order from "./order";
import OrderItem from "./order_item";

describe('Order unit tests', () => {

    it("Should throw error when id is empty/blank", () => {
        expect(() => {
            new Order("", "", []);
        }).toThrow("Order::Id is required");
        expect(() => {
            new Order(" ", "", []);
        }).toThrow("Order::Id is required");
    });

    it("Should throw error when customerId is empty/blank", () => {
        expect(() => {
            new Order("1", "", []);
        }).toThrow("Order::CustomerId is required");
        expect(() => {
            new Order("1", " ", []);
        }).toThrow("Order::CustomerId is required");
    });

    it("Should throw error when itens is empty", () => {
        expect(() => {
            new Order("1", "1", []);
        }).toThrow("Order::Items are required");
    });

    it("Should create order", () => {
        const item1 = new OrderItem("1", "Item 1", 3.78, "1919", 1);
        const item2 = new OrderItem("2", "Item 2", 0.99, "1919", 2);
        const order = new Order("1", "1", [item1, item2]);

        expect(order.id).toBe("1");
        expect(order.customerId).toBe("1");
        
        const items = order.items;
        expect(items.length).toBe(2);
        expect(order.total()).toBe(5.76);
    });

    it("Should calculate total", () => {
        const item = new OrderItem("1", "Item 1", 1.00, "1919", 1);
        const order = new Order("1", "1", [item]);

        const total = order.total();

        expect(total).toBe(1.00);
    });

});