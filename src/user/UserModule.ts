import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { SequelizeModule } from '@nestjs/sequelize';
import { UserFactory } from 'src/user/domain/UserFactory';
import { UserCreateHandler } from './application/command/handler/UserCreateHandler';
import { UserSaga } from './application/sagas/UserSaga';
import { UserEntity } from './infrastructure/entity/UserEntity';
import { UserResolver } from './interface/UserResolver';

const infrastructure: Provider[] = [];

const application = [UserCreateHandler, UserSaga];

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
