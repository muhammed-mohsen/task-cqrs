import { ICommand } from '@nestjs/cqrs';

export class TodoRemoveCommand implements ICommand {
  constructor(readonly id: string) {}
}
