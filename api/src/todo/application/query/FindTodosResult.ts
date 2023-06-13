import { IQueryResult } from '@nestjs/cqrs';
import { TodoEntity } from 'src/todo/infrastructure/entity/TodoEntity';

export class FindTodosResult implements IQueryResult {
  constructor(readonly todos: Readonly<TodoEntity>[]) {}
}
