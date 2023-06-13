import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class TodoCreateInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly text: string;

  @Field({ nullable: true })
  readonly userId: string;
}
