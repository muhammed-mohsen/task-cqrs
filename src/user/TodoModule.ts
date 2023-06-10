import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
// import { Cron, CronExpression } from '@nestjs/schedule';
// import addYears from 'date-fns/addYears';
// import { LessThan } from 'typeorm';

// import { TASK_PUBLISHER, TaskPublisher } from 'libs/MessageModule';
// import { PasswordModule } from 'libs/PasswordModule';

// import { UserQueryImplement } from 'src/user/infrastructure/query/UserQueryImplement';
// import { UserRepositoryImplement } from 'src/user/infrastructure/repository/UserRepositoryImplement';

// import { UserTaskController } from 'src/user/interface/UserTaskController';

// import { CloseUserHandler } from 'src/user/application/command/CloseUserHandler';
// import { DepositHandler } from 'src/user/application/command/DepositHandler';
// import { LockUserCommand } from 'src/user/application/command/LockUserCommand';
// import { LockUserHandler } from 'src/user/application/command/LockUserHandler';
// import { OpenUserHandler } from 'src/user/application/command/OpenUserHandler';
// import { RemitHandler } from 'src/user/application/command/RemitHandler';
// import { UpdatePasswordHandler } from 'src/user/application/command/UpdatePasswordHandler';
// import { WithdrawHandler } from 'src/user/application/command/WithdrawHandler';
// import { DepositedHandler } from 'src/user/application/event/DepositedHandler';
// import { PasswordUpdatedHandler } from 'src/user/application/event/PasswordUpdatedHandler';
// import { UserClosedHandler } from 'src/user/application/event/UserClosedHandler';
// import { UserOpenedHandler } from 'src/user/application/event/UserOpenedHandler';
import { InjectionToken } from 'src/user/application/InjectionToken';
// import { FindUserByIdHandler } from 'src/user/application/query/FindUserByIdHandler';
// import { FindUsersHandler } from 'src/user/application/query/FindUsersHandler';

// import { UserDomainService } from 'src/user/domain/UserDomainService';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserFactory } from 'src/user/domain/UserFactory';
import { UserCreateHandler } from './application/command/handler/UserCreateHandler';
import { UserEntity } from './infrastructure/entity/UserEntity';
import { UserRepositoryImplement } from './infrastructure/repository/AccountRepositoryImplement';
import { UserResolver } from './interface/UserResolver';

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.TODO_REPOSITORY,
    useClass: UserRepositoryImplement,
  },
  //   {
  //     provide: InjectionToken.TODO_QUERY,
  //     useClass: UserQueryImplement,
  //   },
];

const application = [
  //   CloseUserHandler,
  //   DepositHandler,
  //   OpenUserHandler,
  //   RemitHandler,
  //   UpdatePasswordHandler,
  //   WithdrawHandler,
  //   FindUserByIdHandler,
  //   FindUsersHandler,
  //   UserOpenedHandler,
  //   LockUserHandler,
  //   PasswordUpdatedHandler,
  //   UserClosedHandler,
  //   DepositedHandler,
  //   WithdrawnHandler,
  UserCreateHandler,
];

const domain = [UserFactory];

@Module({
  imports: [CqrsModule, SequelizeModule.forFeature([UserEntity])],
  providers: [
    Logger,
    UserResolver,
    ...infrastructure,
    ...application,
    ...domain,
  ],
})
export class UsersModule {
  //   @Inject(TASK_PUBLISHER) private readonly taskPublisher: TaskPublisher;
  //   @Inject(ENTITY_ID_TRANSFORMER)
  //   private readonly entityIdTransformer: EntityIdTransformer;
  //   @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  //   async lockUnusedUser(): Promise<void> {
  //     (
  //       await writeConnection.manager
  //         .getRepository(UserEntity)
  //         .findBy({ updatedAt: LessThan(addYears(new Date(), -1)) })
  //     ).forEach((user) =>
  //       this.taskPublisher.publish(
  //         LockUserCommand.name,
  //         new LockUserCommand(this.entityIdTransformer.from(user.id)),
  //       ),
  //     );
  //   }
}
