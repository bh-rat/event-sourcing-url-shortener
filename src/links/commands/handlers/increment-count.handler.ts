import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoreEventPublisher } from 'event-sourcing-nestjs';

import { LinkRepository } from '../../repository/link.repository';
import { IncrementCountCommand } from '../impl/increment-count.command';


@CommandHandler(IncrementCountCommand)
export class IncrementCountHandler implements ICommandHandler<IncrementCountCommand> {
  constructor(
    private readonly repository: LinkRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(command: IncrementCountCommand) {
    const link = this.publisher.mergeObjectContext(
      await this.repository.findOneById(command.linkId),
    );
    link.autoCommit = true;
    link.incrementViewCount(command.count);
  }
}
