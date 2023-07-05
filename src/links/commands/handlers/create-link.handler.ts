import { InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StoreEventPublisher } from 'event-sourcing-nestjs';

import { LinkRepository } from '../../repository/link.repository';
import { CreateLinkCommand } from '../impl/create-link.command';


@CommandHandler(CreateLinkCommand)
export class CreateLinkHandler implements ICommandHandler<CreateLinkCommand> {
  constructor(
    private readonly repository: LinkRepository,
    private readonly publisher: StoreEventPublisher,
  ) {}

  async execute(command: CreateLinkCommand): Promise<void>  {
    CreateLinkHandler.validate(command)
    const link = this.publisher.mergeObjectContext(
      await this.repository.findOneById(command.id),
    );
    link.autoCommit = true;
    link.createLink(command.id, command.destination, command.title);
  }

  private static validate(command: CreateLinkCommand): void {
    if (!command.id) {
      throw new InternalServerErrorException(
        'Something went wrong with generating id for the url'
      );
    }

    if (command.destination.length < 3) {
      throw new UnprocessableEntityException(
        'Title must contain at least three letters.',
      );
    }

    if (!CreateLinkHandler.stringIsAValidUrl(command.destination)) {
      throw new UnprocessableEntityException(
        'Destination is not a valid url.',
      );
    }

    // TODO: add other validation rules
  }

  // TODO : move to helper utils
  private static stringIsAValidUrl(url: string) {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  }

}
