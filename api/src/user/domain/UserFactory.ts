import { Inject } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

import { User, UserImplement, UserStatusEnum } from 'src/user/domain/User';

type CreateUserOptions = Readonly<{
  id: string;
  text: string;
  userId: string;
}>;

export class UserFactory {
  @Inject(EventPublisher) private readonly eventPublisher: EventPublisher;

  create(options: CreateUserOptions): User {
    return this.eventPublisher.mergeObjectContext(
      new UserImplement({
        ...options,
        status: UserStatusEnum.IN_PROGRESS,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );
  }
}
