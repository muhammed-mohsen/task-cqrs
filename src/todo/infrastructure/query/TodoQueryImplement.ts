import { Injectable } from '@nestjs/common';

import { TodoEntity } from 'src/todo/infrastructure/entity/TodoEntity';

import { InjectModel } from '@nestjs/sequelize';
import { FindTodoByIdResult } from 'src/todo/application/query/FindTodoByIdResult';
import { FindTodosQuery } from 'src/todo/application/query/FindTodosQuery';
import { FindTodosResult } from 'src/todo/application/query/FindTodosResult';
import { TodoQuery } from 'src/todo/application/query/TodoQuery';

@Injectable()
export class TodoQueryImplement implements TodoQuery {
  @InjectModel(TodoEntity, 'read')
  private readonly todoRepository: typeof TodoEntity;

  async findById(id: string): Promise<FindTodoByIdResult | null> {
    return this.todoRepository.findByPk(id).then((entity) => entity ?? null);
  }

  async find(query: FindTodosQuery): Promise<FindTodosResult> {
    return this.todoRepository
      .findAll({
        offset: query.take,
      })
      .then((entities) => ({
        todos: entities,
      }));
  }
}
