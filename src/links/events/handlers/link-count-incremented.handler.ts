import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { LinkCountIncrementedEvent } from '../impl/link-count-incremented.event';

@EventsHandler(LinkCountIncrementedEvent)
export class LinkCountIncrementedHandler implements IEventHandler<LinkCountIncrementedEvent> {
  
  handle(event: LinkCountIncrementedEvent) {
    // do something
  }

}
