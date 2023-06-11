import { FindUserByIdResult } from 'src/user/application/query/FindUserByIdResult';
import { FindUsersQuery } from 'src/user/application/query/FindUsersQuery';
import { FindUsersResult } from 'src/user/application/query/FindUsersResult';

export interface UserQuery {
  findById: (id: string) => Promise<FindUserByIdResult | null>;
  find: (query: FindUsersQuery) => Promise<FindUsersResult>;
}
