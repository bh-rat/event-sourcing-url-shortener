import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { LinksController } from './links.controller';
import { QueryHandlers } from './queries/handlers';
import { LinkRepository } from './repository/link.repository';


@Module({
  imports: [
    CqrsModule,
    EventSourcingModule.forFeature()
  ],
  controllers: [LinksController],
  providers: [  
    LinkRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ],
})
export class LinksModule {}
