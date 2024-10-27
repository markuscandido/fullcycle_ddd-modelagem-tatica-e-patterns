import OrderItem from "./order_item";

describe('OrderItem unit tests', () => {

    it("Should throw error when id is empty/blank", () => {
        expect(() => {
            new OrderItem("", "", 0, "", 0);
        }).toThrow("OrderItem::Id is required");
        expect(() => {
            new OrderItem(" ", "", 0, "", 0);
        }).toThrow("OrderItem::Id is required");
    });

    it("Should throw error when name is empty/blank", () => {
        expect(() => {
            new OrderItem("1", "", 0, "", 0);
        }).toThrow("OrderItem::Name is required");
        expect(() => {
            new OrderItem("1", " ", 0, "", 0);
        }).toThrow("OrderItem::Name is required");
    });

    it("Should throw error when price is less than 1", () => {
        expect(() => {
            new OrderItem("1", "1", 0, "", 0);
        }).toThrow("OrderItem::Price must be greater than 0");
        expect(() => {
            new OrderItem("1", "1", -5, "", 0);
        }).toThrow("OrderItem::Price must be greater than 0");
    });

    it("Should throw error when productId is empty/blank", () => {
        expect(() => {
            new OrderItem("1", "Order Item 1", 9.99, "", 0);
        }).toThrow("OrderItem::ProductId is required");
        expect(() => {
            new OrderItem("1", "Order Item 1", 9.99, " ", 0);
        }).toThrow("OrderItem::ProductId is required");
    });

    it("Should throw error when quantity is less than 1", () => {
        expect(() => {
            new OrderItem("1", "1", 1, "1", 0);
        }).toThrow("OrderItem::Quantity must be greater than 0");
        expect(() => {
            new OrderItem("1", "1", 1, "1", -9);
        }).toThrow("OrderItem::Quantity must be greater than 0");
    });

    it("Should create OrderItem", () => {
        const orderItem = new OrderItem("1", "Item 1", 10.50, "1919", 2);
        expect(orderItem.id).toBe("1");
        expect(orderItem.name).toBe("Item 1");
        expect(orderItem.price).toBe(10.50);
        expect(orderItem.productId).toBe("1919");
        expect(orderItem.quantity).toBe(2);
        expect(orderItem.total()).toBe(21.00); 
    });

});