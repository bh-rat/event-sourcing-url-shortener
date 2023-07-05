import { StorableEvent } from "event-sourcing-nestjs";

export class LinkCountIncrementedEvent extends StorableEvent{

  eventAggregate = 'link';
  eventVersion = 1;

  constructor(
    public readonly id: string, 
    public readonly viewCount: number
  ) {
    super();
  }

}
