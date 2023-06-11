import { CommandBus, EventPublisher, QueryBus } from '@nestjs/cqrs';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoCreateCommand } from '../application/command/impl/TodoCreateCommand';
import { TodoRemoveCommand } from '../application/command/impl/TodoRemoveCommand';
import { TodoUpdateCommand } from '../application/command/impl/TodoUpdateCommand';
import { FindTodoByIdQuery } from '../application/query/FindTodoByIdQuery';
import { FindTodosQuery } from '../application/query/FindTodosQuery';
import { TodoImplement } from '../domain/Todo';
import { TodoEntity } from '../infrastructure/entity/TodoEntity';
import { TodoCreateInput } from './dto/TodoCreateInput';
import { TodoUpdateInput } from './dto/TodoUpdateInput';

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

    return response;
  }

  @Query((returns) => [TodoEntity])
  async todos(): Promise<void> {
    const query = await this.queryBus.execute(new FindTodosQuery({}));
    return query.todos;
  }

  @Query((returns) => TodoEntity)
  async getTodo(@Args('id', { type: () => String }) id: string): Promise<void> {
    const query = await this.queryBus.execute(new FindTodoByIdQuery(id));
    return query;
  }

  @Mutation(() => TodoEntity)
  async removeTodo(
    @Args('id', { type: () => String }) id: string,
  ): Promise<any> {
    const response = await this.commandBus.execute(new TodoRemoveCommand(id));
    return response;
  }

  @Mutation(() => TodoEntity)
  async updateTodo(
    @Args('id', { type: () => ID }) id: string,
    @Args('TodoUpdateInput') changes: TodoUpdateInput,
  ): Promise<void> {
    const command = new TodoUpdateCommand(id, changes.userId, changes.text);
    const response = await this.commandBus.execute(command);

    const todo = this.publisher.mergeObjectContext(new TodoImplement(response));
    todo.update();
    todo.commit();
    return response;
  }
}
