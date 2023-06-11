import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { SequelizeModule } from '@nestjs/sequelize';
import { UserFactory } from 'src/user/domain/UserFactory';
import { InjectionToken } from './application/InjectionToken';
import { FindUserByIdHandler } from './application/query/FindUserByIdHandler';
import { FindUsersHandler } from './application/query/FindUsersHandler';
import { UserSaga } from './application/sagas/UserSaga';
import { UserEntity } from './infrastructure/entity/UserEntity';
import { UserQueryImplement } from './infrastructure/query/UserQueryImplement';
import { UserResolver } from './interface/UserResolver';

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.USER_QUERY,
    useClass: UserQueryImplement,
  },
];

const application = [UserSaga, FindUserByIdHandler, FindUsersHandler];

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
export class UsersModule {}
