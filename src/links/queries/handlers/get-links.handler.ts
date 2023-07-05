import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { LinkRepository } from '../../repository/link.repository';
import { GetLinksQuery } from '../impl/get-links.query';


@QueryHandler(GetLinksQuery)
export class GetLinksHandler implements IQueryHandler<GetLinksQuery> {
  constructor(private readonly repository: LinkRepository) {}

  async execute(query: GetLinksQuery) {
    return this.repository.findAll();
  }
}
