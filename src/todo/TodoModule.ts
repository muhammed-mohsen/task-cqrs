import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { SequelizeModule } from '@nestjs/sequelize';
import { InjectionToken } from 'src/todo/application/InjectionToken';
import { TodoFactory } from 'src/todo/domain/TodoFactory';
import { TodoCreateHandler } from './application/command/handler/TodoCreateHandler';
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
  //   CloseTodoHandler,
  //   DepositHandler,
  //   OpenTodoHandler,
  //   RemitHandler,
  //   UpdatePasswordHandler,
  //   WithdrawHandler,
  //   FindTodoByIdHandler,
  //   FindTodosHandler,
  //   TodoOpenedHandler,
  //   LockTodoHandler,
  //   PasswordUpdatedHandler,
  //   TodoClosedHandler,
  //   DepositedHandler,
  //   WithdrawnHandler,
  TodoCreateHandler,
];

const domain = [TodoFactory];

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
export class TodosModule {
  //   @Inject(TASK_PUBLISHER) private readonly taskPublisher: TaskPublisher;
  //   @Inject(ENTITY_ID_TRANSFORMER)
  //   private readonly entityIdTransformer: EntityIdTransformer;
  //   @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  //   async lockUnusedTodo(): Promise<void> {
  //     (
  //       await writeConnection.manager
  //         .getRepository(TodoEntity)
  //         .findBy({ updatedAt: LessThan(addYears(new Date(), -1)) })
  //     ).forEach((todo) =>
  //       this.taskPublisher.publish(
  //         LockTodoCommand.name,
  //         new LockTodoCommand(this.entityIdTransformer.from(todo.id)),
  //       ),
  //     );
  //   }
}
