import { AggregateRoot } from '@nestjs/cqrs';
import { LinkCountIncrementedEvent } from '../events/impl/link-count-incremented.event';
import { LinkCreatedEvent } from '../events/impl/link-created.event';


export class Link extends AggregateRoot {

  public id: string;
  public destination: string = '';
  public title: string = '';
  public viewCount: number = null;

  constructor(
      id: string
    ) {
      super();
      this.id = id;
    }

  public static createEmptyLink(id: string){
    return new Link(id)
  }

  incrementViewCount(viewCount: number): void{
    this.apply(new LinkCountIncrementedEvent(this.id, viewCount));
  }

  createLink(linkId: string, destination:string, title:string) {
    this.apply(new LinkCreatedEvent(linkId, destination, title, 0));
  }

  onLinkCountIncrementedEvent(event: LinkCountIncrementedEvent) {
    this.viewCount += Number(event.viewCount);
  }

  onLinkCreatedEvent(event: LinkCreatedEvent){
    this.destination = event.destination
    this.title = event.title
    this.viewCount += Number(event.viewCount)
  }

}
