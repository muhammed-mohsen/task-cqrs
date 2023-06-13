import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindUserByIdQuery } from '../application/query/FindUserByIdQuery';
import { FindUsersQuery } from '../application/query/FindUsersQuery';
import { UserEntity } from '../infrastructure/entity/UserEntity';

@Resolver((of) => UserEntity)
export class UserResolver {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @Query((returns) => [UserEntity])
  async users(): Promise<void> {
    const query = await this.queryBus.execute(new FindUsersQuery({}));
    return query.users;
  }

  @Query((returns) => UserEntity)
  async getUser(@Args('id', { type: () => String }) id: string): Promise<void> {
    const query = await this.queryBus.execute(new FindUserByIdQuery(id));
    return query;
  }
}
