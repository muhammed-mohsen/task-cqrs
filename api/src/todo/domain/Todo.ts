import { AggregateRoot } from '@nestjs/cqrs';
import { TodoUpdatedEvent } from './event/TodoUpdatedEvent';

export type TodoEssentialProperties = Readonly<
  Required<{
    id: string;
    text: string;
  }>
>;
export enum TodoStatusEnum {
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}
export type TodoOptionalProperties = Readonly<
  Partial<{
    status: TodoStatusEnum;
    updatedAt: Date;
    createdAt: Date;
    userId: string;
  }>
>;

export type TodoProperties = TodoEssentialProperties &
  Required<TodoOptionalProperties>;

export interface Todo {
  update: () => void;
}

export class TodoImplement extends AggregateRoot implements Todo {
  constructor(private readonly properties: TodoProperties) {
    super();
  }

  update(): void {
    this.apply(
      new TodoUpdatedEvent(this.properties.userId, {
        ...this.properties,
      }),
    );
  }
}
