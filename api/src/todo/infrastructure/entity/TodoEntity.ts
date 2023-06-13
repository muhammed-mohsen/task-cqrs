import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { TodoStatusEnum } from 'src/todo/domain/Todo';
import { UserEntity } from 'src/user/infrastructure/entity/UserEntity';

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
  @ForeignKey((type) => UserEntity)
  userId: string;

  @Field((type) => UserEntity)
  @BelongsTo(() => UserEntity)
  user: UserEntity;

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
