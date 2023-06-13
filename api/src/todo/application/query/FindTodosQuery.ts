import { IQuery } from '@nestjs/cqrs';

export class FindTodosQuery implements IQuery {
  // readonly skip: number;
  readonly take?: number;

  constructor(options: FindTodosQuery) {
    Object.assign(this, options);
  }
}
