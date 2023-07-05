import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateLinkCommand } from './commands/impl/create-link.command';
import { IncrementCountCommand } from './commands/impl/increment-count.command';
import { CreateLinkDto } from './interfaces/create-link-dto.interface';
import { Link } from './models/link.model';
import { v4 as uuidv4 } from 'uuid';
import { GetLinkQuery } from './queries/impl';
import { GetLinksQuery } from './queries/impl/get-links.query';

@Controller('link')
export class LinksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('')
  async createLink(@Body() dto: CreateLinkDto) {
    // generate a random uuid id
    const id = uuidv4().replace(/-/g, '').slice(0, 8);
    return this.commandBus.execute(new CreateLinkCommand(id, dto.destination, dto.title, 0));
  }

  @Post(':id/count/:count')
  async incrementCount(@Param('id') id: string, @Param('count') count: number) {
    return this.commandBus.execute(new IncrementCountCommand(id, count));
  }

  @Get(':id')
  async findLink(@Param('id') id: string): Promise<Link[]> {
    this.commandBus.execute(new IncrementCountCommand(id, 1))
    return this.queryBus.execute(new GetLinkQuery(id));
  }

  @Get('')
  async findLinks(): Promise<Link[]> {
    return this.queryBus.execute(new GetLinksQuery());
  }

}
