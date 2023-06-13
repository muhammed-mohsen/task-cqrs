import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserQuery } from 'src/user/application/query/UserQuery';

import { FindUserByIdQuery } from 'src/user/application/query/FindUserByIdQuery';
import { FindUserByIdResult } from 'src/user/application/query/FindUserByIdResult';

import { ErrorMessage } from 'src/user/domain/ErrorMessage';
import { InjectionToken } from '../InjectionToken';

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdHandler
  implements IQueryHandler<FindUserByIdQuery, FindUserByIdResult>
{
  @Inject(InjectionToken.USER_QUERY) readonly userQuery: UserQuery;

  async execute(query: FindUserByIdQuery): Promise<FindUserByIdResult> {
    const data = await this.userQuery.findById(query.id);
    if (!data) throw new NotFoundException(ErrorMessage.USER_IS_NOT_FOUND);

    return data;
  }
}
