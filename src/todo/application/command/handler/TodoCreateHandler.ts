import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { TodoFactory } from 'src/todo/domain/TodoFactory';
import { TodoEntity } from 'src/todo/infrastructure/entity/TodoEntity';
import { v4 } from 'uuid';
import { TodoCreateCommand } from '../impl/TodoCreateCommand';
// import { PasswordGenerator, PASSWORD_GENERATOR } from 'libs/PasswordModule';
// import { Transactional } from 'libs/Transactional';

// import { OpenTodoCommand } from 'src/todo/application/command/OpenTodoCommand';
// import { InjectionToken } from 'src/todo/application/InjectionToken';

// import { TodoFactory } from 'src/todo/domain/TodoFactory';
// import { TodoRepository } from 'src/todo/domain/TodoRepository';

@CommandHandler(TodoCreateCommand)
export class TodoCreateHandler
  implements ICommandHandler<TodoCreateCommand, TodoEntity>
{
  //   @Inject(InjectionToken.TODO_REPOSITORY)
  @InjectModel(TodoEntity)
  private readonly todoRepository: typeof TodoEntity;

  @Inject()
  private readonly todoFactory: TodoFactory;

  //   @Transactional()
  async execute(command: TodoCreateCommand): Promise<TodoEntity> {
    const response = await this.todoRepository.create({
      id: v4(),
      ...command,
      status: 'on_progress',
    });

    return response.dataValues;
    // console.log(response, 'response');
    // const todo = this.todoFactory.create({
    //   ...command,
    //   id: await this.todoRepository.newId(),
    // });
    // todo.
    // todo.open();
    // await this.todoRepository.save(todo);
    // todo.commit();
  }
}
