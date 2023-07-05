import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { LinkRepository } from '../../repository/link.repository';
import { GetLinkQuery } from '../impl/get-link.query';


@QueryHandler(GetLinkQuery)
export class GetLinkHandler implements IQueryHandler<GetLinkQuery> {
  constructor(private readonly repository: LinkRepository) {}

  async execute(query: GetLinkQuery) {
    return this.repository.findOneById(query.id);
  }
}
