import { ICommand } from '@nestjs/cqrs';

export class TodoCreateCommand implements ICommand {
  constructor(readonly text: string, readonly userId: string) {}
}
