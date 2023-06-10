import { IEvent } from '@nestjs/cqrs';
import { UserProperties } from '../User';

export class UserCreatedEvent implements IEvent {
  constructor(readonly userId: string, readonly User: UserProperties) {}
}
