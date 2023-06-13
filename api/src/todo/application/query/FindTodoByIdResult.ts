import { IQueryResult } from '@nestjs/cqrs';

export class FindTodoByIdResult implements IQueryResult {
  readonly id: string;
  readonly text: string;
  readonly userId: string;
}
