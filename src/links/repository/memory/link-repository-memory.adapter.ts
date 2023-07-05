/* import { Injectable } from '@nestjs/common';
import { CreateLinkDto } from '../../interfaces/create-link-dto.interface';
import { Link } from '../../models/link.model';
import { LinkRepository } from '../link.repository';

const links = [
  new Link("hunarli", 'https://www.hunar.ai', 'hunar', 'Hunar - Startup 1'),
];

@Injectable()
export class LinkRepositoryMemoryAdapter implements LinkRepository {
  private links = links;

  async findOneById(id: string): Promise<Link> {
    return this.links.find(link => link.id === id);
  }

  async findAll(): Promise<Link[]> {
    return this.links;
  }

  async create(id: string, payload: CreateLinkDto): Promise<void> {
    const { destination, shortcode, title } = payload;
    const newLink = new Link(id, destination, title);
    this.links.push(newLink);
  }

  async delete(id: string): Promise<void> {
    this.links = this.links.filter(link => id !== link.id);
  }

  // TODO : Create a separate DTO for update link
  async incrementCount(id:string, count:number): Promise<void> {
    const link = this.links.find(link => link.id === id);
    link.incrementViewCount(count)
  }

}
 */