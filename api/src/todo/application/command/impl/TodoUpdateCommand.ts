import { ICommand } from '@nestjs/cqrs';

export class TodoUpdateCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly userId?: string,
    readonly text?: string,
    readonly status?: string,
  ) {}
}
