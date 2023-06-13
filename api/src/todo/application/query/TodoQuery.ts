import { FindTodoByIdResult } from 'src/todo/application/query/FindTodoByIdResult';
import { FindTodosQuery } from 'src/todo/application/query/FindTodosQuery';
import { FindTodosResult } from 'src/todo/application/query/FindTodosResult';

export interface TodoQuery {
  findById: (id: string) => Promise<FindTodoByIdResult | null>;
  find: (query: FindTodosQuery) => Promise<FindTodosResult>;
}
