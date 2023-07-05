import { Injectable } from '@nestjs/common';
import { EventStore } from 'event-sourcing-nestjs';
import { model, Schema } from 'mongoose'

import { Link } from '../models/link.model';


const collectionName = 'events';
const IdSchema = new Schema({
  payload: {}
});
const EventModel = model(collectionName, IdSchema);


@Injectable()
export class LinkRepository {
  constructor(
    private readonly eventStore: EventStore
  ) {}

  async findOneById(id: string): Promise<Link> {
    const link = Link.createEmptyLink(id);
    const linkEvents = await this.eventStore.getEvents('link', id);
    link.loadFromHistory(linkEvents)
    return link;
  }

  /**
   * Didn't extend the underlying lib to regenerate & return all events; 
   * Alternatives to current approach : 
   * - Use projections
   * - Extend underlying library to return all events basis aggergate
   */
  async findAll(): Promise<Link[]> {
    var eventPayloads = await EventModel.find({aggregate: 'link'}).select('payload').exec();
    var linkIds = eventPayloads.map(document => document.get('payload').id.toString())
    linkIds = [...new Set(linkIds)]
    const links = []
    for(const linkId of linkIds){
      var link = Link.createEmptyLink(linkId);
      link.loadFromHistory(await this.eventStore.getEvents('link', linkId))
      links.push(link)
    }
    return links
  }
  
}
