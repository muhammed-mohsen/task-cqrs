import { AggregateRoot } from '@nestjs/cqrs';
import { UserCreatedEvent } from './event/UserCreatedEvent';

export type UserEssentialProperties = Readonly<
  Required<{
    id: string;
    text: string;
  }>
>;
export enum UserStatusEnum {
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}
export type UserOptionalProperties = Readonly<
  Partial<{
    status: UserStatusEnum;
    updatedAt: Date;
    createdAt: Date;
    userId: string;
  }>
>;

export type UserProperties = UserEssentialProperties &
  Required<UserOptionalProperties>;

export interface User {
  create: () => void;
}

export class UserImplement extends AggregateRoot implements User {
  constructor(private readonly properties: UserProperties) {
    super();
  }

  create(): void {
    this.apply(
      new UserCreatedEvent(this.properties.userId, {
        ...this.properties,
      }),
    );
  }
}
