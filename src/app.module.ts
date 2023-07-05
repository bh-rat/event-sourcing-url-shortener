import { Module } from '@nestjs/common';
import { EventSourcingModule } from 'event-sourcing-nestjs';

import { LinksModule } from './links/links.module';
import { MONGO_URL } from './config';


@Module({
  imports: [
    LinksModule,
    EventSourcingModule.forRoot({
      mongoURL: MONGO_URL
    })
  ],
})
export class ApplicationModule {}
