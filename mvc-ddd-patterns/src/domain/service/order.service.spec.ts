import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("should throw error when order item list is null or empty", () => {
        const customer = new Customer("1", "Customer One", "12345678910");
        expect(() => {
            OrderService.placeOrder(customer, []);
        }).toThrow("Order must have at least one item");
    });
    
    it("should place an order", () => {
        const customer = new Customer("1", "Customer One", "12345678910");
        const item = new OrderItem("1", "Item 1", 9.99, "123", 1);
        const order = OrderService.placeOrder(customer, [item]);

        expect(customer.rewardPoints).toBe(4);
        expect(order.total()).toBe(9.99);
    });

    it("should get total of all orders", () => {
        const order1Item1 = new OrderItem("1", "Item One", 10.50, "1", 2);
        const order1Item2 = new OrderItem("2", "Item Two", 5.0, "2", 2);
        const order1Item3 = new OrderItem("3", "Item Three", 19.99, "1", 1);

        const order1 = new Order("1", "1", [order1Item1, order1Item2, order1Item3]);

        const order2Item1 = new OrderItem("1", "Item One", 10.0, "1", 1);
        const order2Item2 = new OrderItem("2", "Item Two", 5.0, "2", 2);
        
        const order2 = new Order("2", "1", [order2Item1, order2Item2]);

        const orders = [order1, order2];

        const total = OrderService.total(orders);

        expect(total).toBe(70.99);

    });
});