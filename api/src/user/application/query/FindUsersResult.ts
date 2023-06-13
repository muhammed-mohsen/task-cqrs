import { IQueryResult } from '@nestjs/cqrs';
import { UserEntity } from 'src/user/infrastructure/entity/UserEntity';

export class FindUsersResult implements IQueryResult {
  constructor(readonly users: Readonly<UserEntity>[]) {}
}
