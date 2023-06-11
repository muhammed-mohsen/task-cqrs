import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { TodoEntity } from 'src/todo/infrastructure/entity/TodoEntity';
import { v4 } from 'uuid';
import { TodoCreateCommand } from '../impl/TodoCreateCommand';
@CommandHandler(TodoCreateCommand)
export class TodoCreateHandler
  implements ICommandHandler<TodoCreateCommand, TodoEntity>
{
  @InjectModel(TodoEntity)
  private readonly todoRepository: typeof TodoEntity;

  async execute(command: TodoCreateCommand): Promise<TodoEntity> {
    const response = await this.todoRepository.create({
      id: v4(),
      ...command,
      status: 'in_progress',
    });

    return response.dataValues;
  }
}
