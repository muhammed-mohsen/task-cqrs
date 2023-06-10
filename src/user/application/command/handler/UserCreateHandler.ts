import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { UserFactory } from 'src/user/domain/UserFactory';
import { UserEntity } from 'src/user/infrastructure/entity/UserEntity';
import { v4 } from 'uuid';
import { UserCreateCommand } from '../impl/UserCreateCommand';
// import { PasswordGenerator, PASSWORD_GENERATOR } from 'libs/PasswordModule';
// import { Transactional } from 'libs/Transactional';

// import { OpenUserCommand } from 'src/user/application/command/OpenUserCommand';
// import { InjectionToken } from 'src/user/application/InjectionToken';

// import { UserFactory } from 'src/user/domain/UserFactory';
// import { UserRepository } from 'src/user/domain/UserRepository';

@CommandHandler(UserCreateCommand)
export class UserCreateHandler
  implements ICommandHandler<UserCreateCommand, UserEntity>
{
  //   @Inject(InjectionToken.TODO_REPOSITORY)
  @InjectModel(UserEntity)
  private readonly userRepository: typeof UserEntity;

  @Inject()
  private readonly userFactory: UserFactory;

  //   @Transactional()
  async execute(command: UserCreateCommand): Promise<UserEntity> {
    const response = await this.userRepository.create({
      id: v4(),
      ...command,
      status: 'on_progress',
    });

    return response.dataValues;
    // console.log(response, 'response');
    // const user = this.userFactory.create({
    //   ...command,
    //   id: await this.userRepository.newId(),
    // });
    // user.
    // user.open();
    // await this.userRepository.save(user);
    // user.commit();
  }
}
