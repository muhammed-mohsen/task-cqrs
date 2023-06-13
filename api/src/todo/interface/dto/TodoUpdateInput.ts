import { Field, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { TodoStatusEnum } from 'src/todo/domain/Todo';

@InputType()
export class TodoUpdateInput {
  @Field({ nullable: true })
  readonly text: string;

  @Field({ nullable: true })
  @IsEnum(TodoStatusEnum)
  readonly status: string;

  @Field({ nullable: true })
  readonly userId: string;
}
