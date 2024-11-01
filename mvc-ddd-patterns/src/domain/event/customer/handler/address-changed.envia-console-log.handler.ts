import EventHandlerInterface from "../../@shared/event-handler.interface";
import AddressChangedEvent from "../address-changed.event";

export default class EnviaConsoleLogHandler implements EventHandlerInterface<AddressChangedEvent>{
    
    handle(event: AddressChangedEvent): void {
        console.log(`Endereço do cliente: ${event.eventDate.clientId}, ${event.eventDate.clientName} alterado para: ${event.eventDate.newAddress}`);
    }

}