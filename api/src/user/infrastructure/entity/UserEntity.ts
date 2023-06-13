import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { TodoEntity } from 'src/todo/infrastructure/entity/TodoEntity';

@ObjectType({ description: 'users ' })
@Table({ tableName: 'users' })
export class UserEntity extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  @Field((type) => ID)
  id: string;

  @HasMany(() => TodoEntity)
  @Field(() => [TodoEntity])
  todos: TodoEntity[];

  @Column({ type: DataType.STRING, allowNull: false })
  @Field()
  firstName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @Field()
  lastName: string;
}
