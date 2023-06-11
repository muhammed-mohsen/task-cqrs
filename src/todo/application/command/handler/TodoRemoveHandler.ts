import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { ErrorMessage } from 'src/todo/domain/ErrorMessage';
import { TodoEntity } from 'src/todo/infrastructure/entity/TodoEntity';
import { TodoRemoveCommand } from '../impl/TodoRemoveCommand';

@CommandHandler(TodoRemoveCommand)
export class TodoRemoveHandler
  implements ICommandHandler<TodoRemoveCommand, TodoEntity>
{
  @InjectModel(TodoEntity)
  private readonly todoRepository: typeof TodoEntity;

  async execute(command: TodoRemoveCommand): Promise<TodoEntity> {
    const todo = await this.todoRepository.findByPk(command.id);
    if (!todo) throw new NotFoundException(ErrorMessage.TODO_IS_NOT_FOUND);
    await this.todoRepository.destroy({
      where: { id: command.id },
    });
    return todo;
  }
}
