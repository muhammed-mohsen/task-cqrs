import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { TodoStatusEnum } from 'src/todo/domain/Todo';

@ObjectType({ description: 'todos ' })
@Table({ tableName: 'todos' })
export class TodoEntity extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  @Field((type) => ID)
  id: string;

  @Field((type) => ID)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @Field()
  text: string;

  @Column({
    type: DataType.STRING,
    defaultValue: TodoStatusEnum.IN_PROGRESS,
    allowNull: false,
  })
  @Field()
  status: TodoStatusEnum;
}

// import { BaseEntity } from 'src/account/infrastructure/entity/BaseEntity';
