import { AggregateRoot } from '@nestjs/cqrs';
import { TodoCreatedEvent } from './event/TodoCreatedEvent';

export type TodoEssentialProperties = Readonly<
  Required<{
    id: string;
    text: string;
  }>
>;
export enum TodoStatusEnum {
  IN_PROGRESS = 'in progress',
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
  create: () => void;
}

export class TodoImplement extends AggregateRoot implements Todo {
  constructor(private readonly properties: TodoProperties) {
    super();
  }

  create(): void {
    this.apply(
      new TodoCreatedEvent(this.properties.userId, {
        ...this.properties,
      }),
    );
  }
}
