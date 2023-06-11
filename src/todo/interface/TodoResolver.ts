import { CommandBus, EventPublisher, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoCreateCommand } from '../application/command/impl/TodoCreateCommand';
import { TodoImplement } from '../domain/Todo';
import { TodoEntity } from '../infrastructure/entity/TodoEntity';
import { TodoCreateInput } from './dto/TodoCreateInput';

@Resolver(() => TodoEntity)
export class TodoResolver {
  constructor(
    readonly commandBus: CommandBus,
    readonly queryBus: QueryBus,
    private readonly publisher: EventPublisher,
  ) {}

  @Mutation(() => TodoEntity)
  async createTodo(
    @Args('TodoCreateInput') body: TodoCreateInput,
  ): Promise<void> {
    const command = new TodoCreateCommand(body.text, body.userId);
    const response = await this.commandBus.execute(command);

    const todo = this.publisher.mergeObjectContext(new TodoImplement(response));
    todo.create();
    todo.commit();
    return response;
  }
  @Query((returns) => TodoEntity)
  async getTodo(@Args('TodoCreateInput') body: TodoCreateInput): Promise<void> {
    const command = new TodoCreateCommand(body.text, body.userId);
    const response = await this.commandBus.execute(command);

    // const
    return response;
  }

  // @Auth()
  // @Post('todos/:todoId/withdraw')
  // async withdraw(
  //   // @Headers() header: AuthorizedHeader,
  //   @Param() param: WithdrawRequestParam,
  //   @Body() body: WithdrawRequestDTO,
  // ): Promise<void> {
  // if (header.todoId !== param.todoId)
  //   throw new NotFoundException(ErrorMessage.ACCOUNT_IS_NOT_FOUND);
  // await this.commandBus.execute(
  //   new WithdrawCommand(param.todoId, body.amount),
  // );
  // }

  // @Post('todos/:todoId/deposit')
  // async deposit(
  //   // @Headers() header: AuthorizedHeader,
  //   @Param() param: DepositRequestParam,
  //   @Body() body: DepositRequestDto,
  // ): Promise<void> {
  // if (header.todoId !== param.todoId)
  //   throw new NotFoundException(ErrorMessage.ACCOUNT_IS_NOT_FOUND);
  // await this.commandBus.execute(
  //   new DepositCommand(param.todoId, body.amount),
  // );
  // }

  // @Post('todos/:todoId/remit')
  // async remit(
  //   // @Headers() header: AuthorizedHeader,
  //   @Param() param: RemitRequestParam,
  //   @Body() body: RemitRequestDTO,
  // ): Promise<void> {
  // if (header.todoId !== param.todoId)
  //   throw new NotFoundException(ErrorMessage.ACCOUNT_IS_NOT_FOUND);
  // await this.commandBus.execute(
  //   new RemitCommand(param.todoId, body.receiverId, body.amount),
  // );
  // }

  //   @Auth()
  // @Patch('todos/:todoId/password')
  // async updatePassword(
  //   // @Headers() header: AuthorizedHeader,
  //   @Param() param: UpdatePasswordRequestParam,
  //   @Body() body: UpdatePasswordRequestDTO,
  // ): Promise<void> {
  // await this.commandBus.execute(
  //   new UpdatePasswordCommand(param.todoId, body.password),
  // );
  // }

  // @Delete('todos/:todoId')
  // async closeTodo(
  //   // @Headers() header: AuthorizedHeader,
  //   @Param() param: DeleteTodoRequestParam,
  // ): Promise<void> {
  // if (header.todoId !== param.todoId)
  //   throw new NotFoundException(ErrorMessage.ACCOUNT_IS_NOT_FOUND);
  // await this.commandBus.execute(new CloseTodoCommand(param.todoId));
  // }

  // @Get('todos')
  // async findTodos(
  //   @Query() querystring: FindTodosRequestQueryString,
  // ): Promise<FindTodosResponseDto> {
  // const query = new FindTodosQuery(querystring);
  // return { todos: await this.queryBus.execute(query) };
  // }

  // @Get('todos/:todoId')
  // async findTodoById(
  // @Headers() header: AuthorizedHeader,
  //   @Param() param: FindTodoByIdRequestParam,
  // ): Promise<FindTodoByIdResponseDTO> {
  // if (header.todoId !== param.todoId)
  //   throw new NotFoundException(ErrorMessage.ACCOUNT_IS_NOT_FOUND);
  // return this.queryBus.execute(new FindTodoByIdQuery(param.todoId));
  // }
}
