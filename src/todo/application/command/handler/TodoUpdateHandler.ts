import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { ErrorMessage } from 'src/todo/domain/ErrorMessage';
import { TodoEntity } from 'src/todo/infrastructure/entity/TodoEntity';
import { TodoUpdateCommand } from '../impl/TodoUpdateCommand';
@CommandHandler(TodoUpdateCommand)
export class TodoUpdateHandler
  implements ICommandHandler<TodoUpdateCommand, TodoEntity>
{
  @InjectModel(TodoEntity)
  private readonly todoRepository: typeof TodoEntity;

  async execute(command: TodoUpdateCommand): Promise<TodoEntity> {
    const { id, ...otherProps } = command;
    await this.todoRepository.update({ ...otherProps }, { where: { id } });
    const todo = await this.todoRepository.findByPk(id);
    if (!todo) throw new NotFoundException(ErrorMessage.TODO_IS_NOT_FOUND);

    return todo.dataValues;
    // return response.;
  }
}
