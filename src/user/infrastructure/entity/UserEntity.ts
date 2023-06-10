import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { UserStatusEnum } from 'src/user/domain/User';

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

  @Column({ type: DataType.STRING, allowNull: false })
  @Field()
  text: string;

  @Column({
    type: DataType.STRING,
    defaultValue: UserStatusEnum.IN_PROGRESS,
    allowNull: false,
  })
  @Field()
  status: UserStatusEnum;
}

// import { BaseEntity } from 'src/account/infrastructure/entity/BaseEntity';
