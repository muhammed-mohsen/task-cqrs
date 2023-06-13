import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TodoUpdatedEvent } from 'src/todo/domain/event/TodoUpdatedEvent';

@EventsHandler(TodoUpdatedEvent)
export class TodoUpdatedHandler implements IEventHandler<TodoUpdatedEvent> {
  handle(event: TodoUpdatedEvent) {
    Logger.log('Todo Updated');
    return event;
  }
}
