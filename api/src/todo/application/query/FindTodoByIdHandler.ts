import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TodoQuery } from 'src/todo/application/query/TodoQuery';

import { FindTodoByIdQuery } from 'src/todo/application/query/FindTodoByIdQuery';
import { FindTodoByIdResult } from 'src/todo/application/query/FindTodoByIdResult';

import { ErrorMessage } from 'src/todo/domain/ErrorMessage';
import { InjectionToken } from '../InjectionToken';

@QueryHandler(FindTodoByIdQuery)
export class FindTodoByIdHandler
  implements IQueryHandler<FindTodoByIdQuery, FindTodoByIdResult>
{
  @Inject(InjectionToken.TODO_QUERY) readonly todoQuery: TodoQuery;

  async execute(query: FindTodoByIdQuery): Promise<FindTodoByIdResult> {
    const data = await this.todoQuery.findById(query.id);
    if (!data) throw new NotFoundException(ErrorMessage.TODO_IS_NOT_FOUND);

    return data;
  }
}
