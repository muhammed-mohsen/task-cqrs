import { Inject } from '@nestjs/common';

// import {
//   ENTITY_ID_TRANSFORMER,
//   EntityId,
//   EntityIdTransformer,
//   writeConnection,
// } from 'libs/DatabaseModule';

import { EntityId } from 'libs/DatabaseModule';
import { Todo } from 'src/todo/domain/Todo';
import { TodoFactory } from 'src/todo/domain/TodoFactory';
import TodoRepository from 'src/todo/domain/TodoRepository';

export class TodoRepositoryImplement implements TodoRepository {
  @Inject() private readonly todoFactory: TodoFactory;
  // @Inject(ENTITY_ID_TRANSFORMER)
  // private readonly entityIdTransformer: EntityIdTransformer;

  async newId(): Promise<string> {
    return new EntityId().toString();
  }

  async create(data: Todo): Promise<void> {
    const models = Array.isArray(data) ? data : [data];
    // const entities = models.map((model) => this.modelToEntity(model));
    // await writeConnection.manager.getRepository(TodoEntity).save(entities);
  }

  // async findById(id: string): Promise<Todo | null> {
  //   const entity = await writeConnection.manager
  //     .getRepository(TodoEntity)
  //     .findOneBy({ id: this.entityIdTransformer.to(id) });
  //   return entity ? this.entityToModel(entity) : null;
  // }

  // async findByName(name: string): Promise<Todo[]> {
  //   const entities = await writeConnection.manager
  //     .getRepository(TodoEntity)
  //     .findBy({ name });
  //   return entities.map((entity) => this.entityToModel(entity));
  // }

  // private modelToEntity(model: Todo): TodoEntity {
  //   const properties = JSON.parse(JSON.stringify(model)) as TodoProperties;
  //   return {
  //     ...properties,
  //     id: this.entityIdTransformer.to(properties.id),
  //     createdAt: properties.createdAt,
  //     deletedAt: properties.deletedAt,
  //   };
  // }

  // private entityToModel(entity: TodoEntity): Todo {
  //   return this.todoFactory.reconstitute({
  //     ...entity,
  //     id: this.entityIdTransformer.from(entity.id),
  //     createdAt: entity.createdAt,
  //     deletedAt: entity.deletedAt,
  //   });
  // }
}
