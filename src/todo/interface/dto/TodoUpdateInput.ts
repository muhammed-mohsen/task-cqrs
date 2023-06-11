import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TodoUpdateInput {
  @Field({ nullable: true })
  readonly text: string;

  @Field({ nullable: true })
  readonly userId: string;
}
