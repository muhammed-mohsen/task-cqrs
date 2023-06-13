import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindTodosQuery } from 'src/todo/application/query/FindTodosQuery';
import { FindTodosResult } from 'src/todo/application/query/FindTodosResult';
import { TodoQuery } from 'src/todo/application/query/TodoQuery';
import { InjectionToken } from '../InjectionToken';

@QueryHandler(FindTodosQuery)
export class FindTodosHandler
  implements IQueryHandler<FindTodosQuery, FindTodosResult>
{
  @Inject(InjectionToken.TODO_QUERY) readonly todoQuery: TodoQuery;

  async execute(query: FindTodosQuery): Promise<FindTodosResult> {
    return this.todoQuery.find(query);
  }
}
