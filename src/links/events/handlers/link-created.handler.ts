import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { LinkCreatedEvent } from '../impl/link-created.event';

@EventsHandler(LinkCreatedEvent)
export class LinkCreatedEventHandler implements IEventHandler<LinkCreatedEvent> {
  
  handle(event: LinkCreatedEvent) {
    // do something
  }

}
