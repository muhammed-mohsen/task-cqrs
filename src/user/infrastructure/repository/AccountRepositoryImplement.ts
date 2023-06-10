import { Inject } from '@nestjs/common';

// import {
//   ENTITY_ID_TRANSFORMER,
//   EntityId,
//   EntityIdTransformer,
//   writeConnection,
// } from 'libs/DatabaseModule';

import { EntityId } from 'libs/DatabaseModule';
import { User } from 'src/user/domain/User';
import { UserFactory } from 'src/user/domain/UserFactory';
import UserRepository from 'src/user/domain/UserRepository';

export class UserRepositoryImplement implements UserRepository {
  @Inject() private readonly userFactory: UserFactory;
  // @Inject(ENTITY_ID_TRANSFORMER)
  // private readonly entityIdTransformer: EntityIdTransformer;

  async newId(): Promise<string> {
    return new EntityId().toString();
  }

  async create(data: User): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    // const entities = models.map((model) => this.modelToEntity(model));
    // await writeConnection.manager.getRepository(UserEntity).save(entities);
  }

  // async findById(id: string): Promise<User | null> {
  //   const entity = await writeConnection.manager
  //     .getRepository(UserEntity)
  //     .findOneBy({ id: this.entityIdTransformer.to(id) });
  //   return entity ? this.entityToModel(entity) : null;
  // }

  // async findByName(name: string): Promise<User[]> {
  //   const entities = await writeConnection.manager
  //     .getRepository(UserEntity)
  //     .findBy({ name });
  //   return entities.map((entity) => this.entityToModel(entity));
  // }

  // private modelToEntity(model: User): UserEntity {
  //   const properties = JSON.parse(JSON.stringify(model)) as UserProperties;
  //   return {
  //     ...properties,
  //     id: this.entityIdTransformer.to(properties.id),
  //     createdAt: properties.createdAt,
  //     deletedAt: properties.deletedAt,
  //   };
  // }

  // private entityToModel(entity: UserEntity): User {
  //   return this.userFactory.reconstitute({
  //     ...entity,
  //     id: this.entityIdTransformer.from(entity.id),
  //     createdAt: entity.createdAt,
  //     deletedAt: entity.deletedAt,
  //   });
  // }
}
