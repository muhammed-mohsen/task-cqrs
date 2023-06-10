import { CommandBus, QueryBus } from '@nestjs/cqrs';

// import { DeleteUserRequestParam } from 'src/user/interface/dto/DeleteUserRequestParam';
// import { DepositRequestDto } from 'src/user/interface/dto/DepositRequestDto';
// import { DepositRequestParam } from 'src/user/interface/dto/DepositRequestParam';
// import { FindUserByIdRequestParam } from 'src/user/interface/dto/FindUserByIdRequestParam';
// import { FindUserByIdResponseDTO } from 'src/user/interface/dto/FindUserByIdResponseDTO';
// import { FindUsersRequestQueryString } from 'src/user/interface/dto/FindUsersRequestQueryString';
// import { FindUsersResponseDto } from 'src/user/interface/dto/FindUsersResponseDto';
import { Resolver } from '@nestjs/graphql';
import { UserEntity } from '../infrastructure/entity/UserEntity';

@Resolver((of) => UserEntity)
export class UsersController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  // @Query((returns) => UserEntity)
  // async createUser(@Body() body: UserCreateRequestDTO): Promise<void> {
  //   console.log(
  //     '🚀 ~ file: UsersController.ts:20 ~ UsersController ~ body:',
  //     body,
  //   );
  //   const command = new UserCreateCommand(body.text, body.userId);
  //   await this.commandBus.execute(command);
  // }

  // @Auth()
  // @Post('users/:userId/withdraw')
  // async withdraw(
  //   // @Headers() header: AuthorizedHeader,
  //   @Param() param: WithdrawRequestParam,
  //   @Body() body: WithdrawRequestDTO,
  // ): Promise<void> {
  // if (header.userId !== param.userId)
  //   throw new NotFoundException(ErrorMessage.ACCOUNT_IS_NOT_FOUND);
  // await this.commandBus.execute(
  //   new WithdrawCommand(param.userId, body.amount),
  // );
  // }

  // @Post('users/:userId/deposit')
  // async deposit(
  //   // @Headers() header: AuthorizedHeader,
  //   @Param() param: DepositRequestParam,
  //   @Body() body: DepositRequestDto,
  // ): Promise<void> {
  // if (header.userId !== param.userId)
  //   throw new NotFoundException(ErrorMessage.ACCOUNT_IS_NOT_FOUND);
  // await this.commandBus.execute(
  //   new DepositCommand(param.userId, body.amount),
  // );
  // }

  // @Post('users/:userId/remit')
  // async remit(
  //   // @Headers() header: AuthorizedHeader,
  //   @Param() param: RemitRequestParam,
  //   @Body() body: RemitRequestDTO,
  // ): Promise<void> {
  // if (header.userId !== param.userId)
  //   throw new NotFoundException(ErrorMessage.ACCOUNT_IS_NOT_FOUND);
  // await this.commandBus.execute(
  //   new RemitCommand(param.userId, body.receiverId, body.amount),
  // );
  // }

  //   @Auth()
  // @Patch('users/:userId/password')
  // async updatePassword(
  //   // @Headers() header: AuthorizedHeader,
  //   @Param() param: UpdatePasswordRequestParam,
  //   @Body() body: UpdatePasswordRequestDTO,
  // ): Promise<void> {
  // await this.commandBus.execute(
  //   new UpdatePasswordCommand(param.userId, body.password),
  // );
  // }

  // @Delete('users/:userId')
  // async closeUser(
  //   // @Headers() header: AuthorizedHeader,
  //   @Param() param: DeleteUserRequestParam,
  // ): Promise<void> {
  // if (header.userId !== param.userId)
  //   throw new NotFoundException(ErrorMessage.ACCOUNT_IS_NOT_FOUND);
  // await this.commandBus.execute(new CloseUserCommand(param.userId));
  // }

  // @Get('users')
  // async findUsers(
  //   @Query() querystring: FindUsersRequestQueryString,
  // ): Promise<FindUsersResponseDto> {
  // const query = new FindUsersQuery(querystring);
  // return { users: await this.queryBus.execute(query) };
  // }

  // @Get('users/:userId')
  // async findUserById(
  // @Headers() header: AuthorizedHeader,
  //   @Param() param: FindUserByIdRequestParam,
  // ): Promise<FindUserByIdResponseDTO> {
  // if (header.userId !== param.userId)
  //   throw new NotFoundException(ErrorMessage.ACCOUNT_IS_NOT_FOUND);
  // return this.queryBus.execute(new FindUserByIdQuery(param.userId));
  // }
}
