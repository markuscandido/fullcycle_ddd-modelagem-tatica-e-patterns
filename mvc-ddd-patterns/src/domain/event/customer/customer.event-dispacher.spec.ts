import AddressChangedEvent from "./address-changed.event";
import CustomerCreatedEvent from "./customer-created.event";
import CustomerEventDispatcher from "./customer.event-dispacher";
import EnviaConsoleLogHandler from "./handler/address-changed.envia-console-log.handler";
import EnviaConsoleLog1Handler from "./handler/customer-created.envia-console-log1.handler";
import EnviaConsoleLog2Handler from "./handler/customer-created.envia-console-log2.handler";

describe("Customer Domain events tests", () => {

    it("should register an event handler",  () => {
        const customerEventDispatcher = new CustomerEventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
        customerEventDispatcher.register("AddressChangedEvent", eventHandler);

        const addressChangedEventHandler = customerEventDispatcher.getEventHandlers["AddressChangedEvent"];
        expect(addressChangedEventHandler).toBeDefined();
        expect(addressChangedEventHandler.length).toBe(1);
        expect(addressChangedEventHandler[0]).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
        const customerEventDispatcher = new CustomerEventDispatcher();
        const eventHandler = new EnviaConsoleLog1Handler();
        customerEventDispatcher.register("CustomerCreatedEvent", eventHandler);

        customerEventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

        expect(customerEventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(customerEventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);
    });

    it("should unregister all event handlers", () => {
        const customerEventDispatcher = new CustomerEventDispatcher();
        const eventHandler1 = new EnviaConsoleLogHandler();
        const eventHandler2 = new EnviaConsoleLog1Handler();
        const eventHandler3 = new EnviaConsoleLog2Handler();
        customerEventDispatcher.register("AddressChangedEvent", eventHandler1);
        customerEventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        customerEventDispatcher.register("CustomerCreatedEvent", eventHandler3);

        expect(customerEventDispatcher.getEventHandlers["AddressChangedEvent"][0]).toMatchObject(eventHandler1);
        expect(customerEventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler2);
        expect(customerEventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler3);

        customerEventDispatcher.unregisterAll();

        expect(customerEventDispatcher.getEventHandlers["AddressChangedEvent"]).toBeUndefined();
        expect(customerEventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
    });

    it("should notify all event handlers", () => {
        const customerEventDispatcher = new CustomerEventDispatcher();
        const eventHandler1 = new EnviaConsoleLogHandler();
        const eventHandler2 = new EnviaConsoleLog1Handler();
        const eventHandler3 = new EnviaConsoleLog2Handler();
        customerEventDispatcher.register("AddressChangedEvent", eventHandler1);
        customerEventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        customerEventDispatcher.register("CustomerCreatedEvent", eventHandler3);

        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
        const spyEventHandler3 = jest.spyOn(eventHandler3, "handle");
        
        const customerCreatedEvent = new CustomerCreatedEvent({
            clientId: "1",
            clientName: "Client Name"
        });

        const addressChangeEvent = new AddressChangedEvent({
            clientId: "1",
            clientName: "Client Name",
            newAddress: {
                street: "New Street",
                number: "123",
                zipcode: "99999999",
                city: "New City"
            }
        });

        customerEventDispatcher.notify(customerCreatedEvent);
        customerEventDispatcher.notify(addressChangeEvent);
        expect(spyEventHandler1).toHaveBeenCalledTimes(1);
        expect(spyEventHandler2).toHaveBeenCalledTimes(1);
        expect(spyEventHandler3).toHaveBeenCalledTimes(1);
    });

    it("should no notify when handler not register", () => {
        const customerEventDispatcher = new CustomerEventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
        
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        
        const addressChangedEvent = new AddressChangedEvent({
            clientId: "1",
            clientName: "Client Name"
        });

        customerEventDispatcher.notify(addressChangedEvent);

        expect(spyEventHandler).toHaveBeenCalledTimes(0);
    });

    it("should not throw an error when trying to unregister from an event that does not exist", () => {
        const customerEventDispatcher = new CustomerEventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
    
        expect(() => {
            customerEventDispatcher.unregister("NonExistentEvent", eventHandler);
        }).not.toThrow();
    });

    it("should not throw an error when trying to unregister an event handler that is not registered", () => {
        const customerEventDispatcher = new CustomerEventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
        const anotherEventHandler = new EnviaConsoleLogHandler();
    
        customerEventDispatcher.register("AddressChangedEvent", anotherEventHandler);
    
        expect(() => {
            customerEventDispatcher.unregister("AddressChangedEvent", eventHandler);
        }).not.toThrow();
        
        expect(customerEventDispatcher.getEventHandlers["AddressChangedEvent"].length).toBe(1); // confirma que o outro handler ainda está registrado
    });
    

});