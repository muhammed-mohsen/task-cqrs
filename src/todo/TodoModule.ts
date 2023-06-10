import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
// import { Cron, CronExpression } from '@nestjs/schedule';
// import addYears from 'date-fns/addYears';
// import { LessThan } from 'typeorm';

// import { TASK_PUBLISHER, TaskPublisher } from 'libs/MessageModule';
// import { PasswordModule } from 'libs/PasswordModule';

// import { TodoQueryImplement } from 'src/todo/infrastructure/query/TodoQueryImplement';
// import { TodoRepositoryImplement } from 'src/todo/infrastructure/repository/TodoRepositoryImplement';

// import { TodoTaskController } from 'src/todo/interface/TodoTaskController';

// import { CloseTodoHandler } from 'src/todo/application/command/CloseTodoHandler';
// import { DepositHandler } from 'src/todo/application/command/DepositHandler';
// import { LockTodoCommand } from 'src/todo/application/command/LockTodoCommand';
// import { LockTodoHandler } from 'src/todo/application/command/LockTodoHandler';
// import { OpenTodoHandler } from 'src/todo/application/command/OpenTodoHandler';
// import { RemitHandler } from 'src/todo/application/command/RemitHandler';
// import { UpdatePasswordHandler } from 'src/todo/application/command/UpdatePasswordHandler';
// import { WithdrawHandler } from 'src/todo/application/command/WithdrawHandler';
// import { DepositedHandler } from 'src/todo/application/event/DepositedHandler';
// import { PasswordUpdatedHandler } from 'src/todo/application/event/PasswordUpdatedHandler';
// import { TodoClosedHandler } from 'src/todo/application/event/TodoClosedHandler';
// import { TodoOpenedHandler } from 'src/todo/application/event/TodoOpenedHandler';
import { InjectionToken } from 'src/todo/application/InjectionToken';
// import { FindTodoByIdHandler } from 'src/todo/application/query/FindTodoByIdHandler';
// import { FindTodosHandler } from 'src/todo/application/query/FindTodosHandler';

// import { TodoDomainService } from 'src/todo/domain/TodoDomainService';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodoFactory } from 'src/todo/domain/TodoFactory';
import { TodoCreateHandler } from './application/command/handler/TodoCreateHandler';
import { TodoEntity } from './infrastructure/entity/TodoEntity';
import { TodoRepositoryImplement } from './infrastructure/repository/AccountRepositoryImplement';
import { TodoResolver } from './interface/TodoResolver';

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.TODO_REPOSITORY,
    useClass: TodoRepositoryImplement,
  },
  //   {
  //     provide: InjectionToken.TODO_QUERY,
  //     useClass: TodoQueryImplement,
  //   },
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
