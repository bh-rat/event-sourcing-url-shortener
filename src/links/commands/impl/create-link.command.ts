export class CreateLinkCommand {
  constructor(
    public readonly id: string,
    public readonly destination: string,
    public readonly title: string,
    public readonly viewCount: number
  ) {}
}
