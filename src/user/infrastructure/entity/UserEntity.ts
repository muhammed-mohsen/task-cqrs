import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
  firstName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  @Field()
  lastName: string;
}

// import { BaseEntity } from 'src/account/infrastructure/entity/BaseEntity';
