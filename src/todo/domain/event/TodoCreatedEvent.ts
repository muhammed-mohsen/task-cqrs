import { IEvent } from '@nestjs/cqrs';
import { TodoProperties } from '../Todo';

export class TodoCreatedEvent implements IEvent {
  constructor(readonly userId: string, readonly Todo: TodoProperties) {}
}
