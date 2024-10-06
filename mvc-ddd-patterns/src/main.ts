import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer("1", "Markus Vinicius Candido");
const address = new Address("Rua Principal", 33, "99888-666", "Cidade");
customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10.99);
const item2 = new OrderItem("2", "Item 2", 15.00);
const item3 = new OrderItem("3", "Item 3", 19.87);
const order = new Order("1", "1", [item1, item2, item3]);