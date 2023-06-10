import { ICommand } from '@nestjs/cqrs';

export class UserCreateCommand implements ICommand {
  constructor(readonly text: string, readonly userId: string) {}
}
