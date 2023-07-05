export class IncrementCountCommand {
  constructor(
    public readonly linkId: string,
    public readonly count: number
  ) {}
}
