import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

import { Todo, TodoImplement, TodoStatusEnum } from 'src/todo/domain/Todo';

type CreateTodoOptions = Readonly<{
  id: string;
  text: string;
  userId: string;
}>;

export class TodoFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateTodoOptions): Todo {
    return this.eventPublisher.mergeObjectContext(
      new TodoImplement({
        ...options,
        status: TodoStatusEnum.IN_PROGRESS,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );
  }
}
