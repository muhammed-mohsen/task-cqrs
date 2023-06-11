import { CommandBus, QueryBus } from '@nestjs/cqrs';

// import { DeleteUserRequestParam } from 'src/user/interface/dto/DeleteUserRequestParam';
// import { DepositRequestDto } from 'src/user/interface/dto/DepositRequestDto';
// import { DepositRequestParam } from 'src/user/interface/dto/DepositRequestParam';
// import { FindUserByIdRequestParam } from 'src/user/interface/dto/FindUserByIdRequestParam';
// import { FindUserByIdResponseDTO } from 'src/user/interface/dto/FindUserByIdResponseDTO';
// import { FindUsersRequestQueryString } from 'src/user/interface/dto/FindUsersRequestQueryString';
// import { FindUsersResponseDto } from 'src/user/interface/dto/FindUsersResponseDto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserCreateCommand } from '../application/command/impl/UserCreateCommand';
import { FindUserByIdQuery } from '../application/query/FindUserByIdQuery';
import { FindUsersQuery } from '../application/query/FindUsersQuery';
import { UserEntity } from '../infrastructure/entity/UserEntity';
import { UserCreateInput } from './dto/UserCreateInput';

@Resolver((of) => UserEntity)
export class UserResolver {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @Mutation(() => UserEntity)
  async createUser(
    @Args('UserCreateInput') body: UserCreateInput,
  ): Promise<void> {
    const command = new UserCreateCommand(body.text, body.userId);
    const response = await this.commandBus.execute(command);
    return response;
  }
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
