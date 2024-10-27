import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

const address = new Address("Rua Principal", "999", "99888-666", "Cidade");
let customer = new Customer("1", "Nome Sobrenome", "12345678910", address);
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10.99, "123", 1);
const item2 = new OrderItem("2", "Item 2", 15.00, "123", 2);
const item3 = new OrderItem("3", "Item 3", 19.87, "123", 3);
const order = new Order("1", "1", [item1, item2, item3]);