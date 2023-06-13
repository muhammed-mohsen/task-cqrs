import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserCreateInput {
  @Field()
  readonly text: string;

  @Field({ nullable: true })
  readonly userId: string;
}
