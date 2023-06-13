import { IQueryResult } from '@nestjs/cqrs';
import { TodoEntity } from 'src/todo/infrastructure/entity/TodoEntity';

export class FindUserByIdResult implements IQueryResult {
  readonly id: string;
  readonly firstName: string;
  readonly LastName: string;
  readonly todo: TodoEntity[];
}
