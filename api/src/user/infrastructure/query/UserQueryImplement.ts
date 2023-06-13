import { Injectable } from '@nestjs/common';

import { UserEntity } from 'src/user/infrastructure/entity/UserEntity';

import { InjectModel } from '@nestjs/sequelize';
import { TodoEntity } from 'src/todo/infrastructure/entity/TodoEntity';
import { FindUserByIdResult } from 'src/user/application/query/FindUserByIdResult';
import { FindUsersQuery } from 'src/user/application/query/FindUsersQuery';
import { FindUsersResult } from 'src/user/application/query/FindUsersResult';
import { UserQuery } from 'src/user/application/query/UserQuery';

@Injectable()
export class UserQueryImplement implements UserQuery {
  @InjectModel(UserEntity)
  private readonly userRepository: typeof UserEntity;

  async findById(id: string): Promise<FindUserByIdResult | null> {
    return this.userRepository
      .findByPk(id)
      .then((entity) => entity.dataValues ?? null);
  }

  async find(query: FindUsersQuery): Promise<FindUsersResult> {
    return this.userRepository
      .findAll({
        offset: query.take,
        include: TodoEntity,
      })
      .then((entities) => ({
        users: entities,
      }));
  }
}
