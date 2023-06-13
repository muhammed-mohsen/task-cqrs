import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindUsersQuery } from 'src/user/application/query/FindUsersQuery';
import { FindUsersResult } from 'src/user/application/query/FindUsersResult';
import { UserQuery } from 'src/user/application/query/UserQuery';
import { InjectionToken } from '../InjectionToken';

@QueryHandler(FindUsersQuery)
export class FindUsersHandler
  implements IQueryHandler<FindUsersQuery, FindUsersResult>
{
  @Inject(InjectionToken.USER_QUERY) readonly userQuery: UserQuery;

  async execute(query: FindUsersQuery): Promise<FindUsersResult> {
    return this.userQuery.find(query);
  }
}
