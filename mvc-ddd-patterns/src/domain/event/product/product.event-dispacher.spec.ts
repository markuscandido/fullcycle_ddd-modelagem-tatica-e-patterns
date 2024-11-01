import SendEmailProductCreatedHandler from "./handler/product-created.send-email.handler";
import ProductCreatedEvent from "./product-created.event";
import ProductEventDispatcher from "./product.event-dispacher";

describe("Domain events tests", () => {

    it("should register an event handler",  () => {
        const productEventDispatcher = new ProductEventDispatcher();
        const sendEmailEventHandler = new SendEmailProductCreatedHandler();
        productEventDispatcher.register("ProductCreatedEvent", sendEmailEventHandler);

        const productCreatedEventHandler = productEventDispatcher.getEventHandlers["ProductCreatedEvent"];
        expect(productCreatedEventHandler).toBeDefined();
        expect(productCreatedEventHandler.length).toBe(1);
        expect(productCreatedEventHandler[0]).toMatchObject(sendEmailEventHandler);
    });

    it("should unregister an event handler", () => {
        const productEventDispatcher = new ProductEventDispatcher();
        const sendEmailEventHandler = new SendEmailProductCreatedHandler();
        productEventDispatcher.register("ProductCreatedEvent", sendEmailEventHandler);

        expect(productEventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(sendEmailEventHandler);

        productEventDispatcher.unregister("ProductCreatedEvent", sendEmailEventHandler);

        expect(productEventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(productEventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });

    it("should unregister all event handlers", () => {
        const productEventDispatcher = new ProductEventDispatcher();
        const sendEmailEventHandler = new SendEmailProductCreatedHandler();
        productEventDispatcher.register("ProductCreatedEvent", sendEmailEventHandler);
        productEventDispatcher.register("ProductUpdatedEvent", sendEmailEventHandler);

        expect(productEventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(sendEmailEventHandler);
        expect(productEventDispatcher.getEventHandlers["ProductUpdatedEvent"][0]).toMatchObject(sendEmailEventHandler);

        productEventDispatcher.unregisterAll();

        expect(productEventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
        expect(productEventDispatcher.getEventHandlers["ProductUpdatedEvent"]).toBeUndefined();
    });

    it("should notify all event handlers", () => {
        const productEventDispatcher = new ProductEventDispatcher();
        const sendEmailEventHandler = new SendEmailProductCreatedHandler();
        productEventDispatcher.register("ProductCreatedEvent", sendEmailEventHandler);

        const spyEventHandler = jest.spyOn(sendEmailEventHandler, "handle");
        
        const productCreatedEvent = new ProductCreatedEvent({
            productId: "123",
            productName: "Product 1",
            price: 9.99
        });

        productEventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalledTimes(1);
    });

    it("should no notify when handler not register", () => {
        const productEventDispatcher = new ProductEventDispatcher();
        const sendEmailEventHandler = new SendEmailProductCreatedHandler();
        //productEventDispatcher.register("ProductCreatedEvent", sendEmailEventHandler);

        const spyEventHandler = jest.spyOn(sendEmailEventHandler, "handle");
        
        const productCreatedEvent = new ProductCreatedEvent({
            productId: "123",
            productName: "Product 1",
            price: 9.99
        });

        productEventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalledTimes(0);
    });

    it("should not throw an error when trying to unregister from an event that does not exist", () => {
        const productEventDispatcher = new ProductEventDispatcher();
        const sendEmailEventHandler = new SendEmailProductCreatedHandler();
    
        expect(() => {
            productEventDispatcher.unregister("NonExistentEvent", sendEmailEventHandler);
        }).not.toThrow();
    });

    it("should not throw an error when trying to unregister an event handler that is not registered", () => {
        const productEventDispatcher = new ProductEventDispatcher();
        const sendEmailEventHandler = new SendEmailProductCreatedHandler();
        const anotherEventHandler = new SendEmailProductCreatedHandler();
    
        productEventDispatcher.register("AnEvent", anotherEventHandler);
    
        expect(() => {
            productEventDispatcher.unregister("AnEvent", sendEmailEventHandler);
        }).not.toThrow();
        
        expect(productEventDispatcher.getEventHandlers["AnEvent"].length).toBe(1); // confirma que o outro handler ainda está registrado
    });

});