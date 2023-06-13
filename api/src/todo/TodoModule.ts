import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { SequelizeModule } from '@nestjs/sequelize';
import { InjectionToken } from 'src/todo/application/InjectionToken';
import { TodoCreateHandler } from './application/command/handler/TodoCreateHandler';
import { TodoRemoveHandler } from './application/command/handler/TodoRemoveHandler';
import { TodoUpdateHandler } from './application/command/handler/TodoUpdateHandler';
import { TodoUpdatedHandler } from './application/events/TodoUpdatedHandler';
import { FindTodoByIdHandler } from './application/query/FindTodoByIdHandler';
import { FindTodosHandler } from './application/query/FindTodosHandler';
import { TodoEntity } from './infrastructure/entity/TodoEntity';
import { TodoQueryImplement } from './infrastructure/query/TodoQueryImplement';
import { TodoResolver } from './interface/TodoResolver';

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.TODO_QUERY,
    useClass: TodoQueryImplement,
  },
];

const application = [
  TodoCreateHandler,
  FindTodosHandler,
  FindTodoByIdHandler,
  TodoRemoveHandler,
  TodoUpdateHandler,
  TodoUpdatedHandler,
];

const domain = [];

console.log(process.env.DATABASE_PORT, 'sdfsad');
@Module({
  imports: [CqrsModule, SequelizeModule.forFeature([TodoEntity])],
  providers: [
    Logger,
    TodoResolver,
    ...infrastructure,
    ...application,
    ...domain,
  ],
})
export class TodosModule {}
