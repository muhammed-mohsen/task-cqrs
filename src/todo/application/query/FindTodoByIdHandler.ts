import {
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

    const dataKeys = Object.keys(data);
    const resultKeys = Object.keys(new FindTodoByIdResult());

    if (dataKeys.length < resultKeys.length)
      throw new InternalServerErrorException();

    if (resultKeys.find((resultKey) => !dataKeys.includes(resultKey)))
      throw new InternalServerErrorException();

    dataKeys
      .filter((dataKey) => !resultKeys.includes(dataKey))
      .forEach((dataKey) => delete data[dataKey]);

    return data;
  }
}
