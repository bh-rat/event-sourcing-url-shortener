import { StorableEvent } from "event-sourcing-nestjs";

export class LinkCreatedEvent extends StorableEvent {
    
    eventAggregate = 'link';
    eventVersion = 1;

    constructor(
        public readonly id: string, 
        public readonly destination: string,
        public readonly title: string,
        public readonly viewCount: number
    ) {
        super();
    }
  }
  