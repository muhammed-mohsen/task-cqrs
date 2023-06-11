import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { RequestStorageMiddleware } from 'libs/RequestStorageMiddleware';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todo/TodoModule';
import { TodoEntity } from './todo/infrastructure/entity/TodoEntity';
import { UsersModule } from './user/UserModule';
import { UserEntity } from './user/infrastructure/entity/UserEntity';
const databaseConfig: SequelizeModuleOptions = {
  host: 'mysql',
  dialect: 'mysql',
  port: 3306,
  username: 'user',
  password: 'password',

  database: 'todo',
  // autoLoadModels: true,
  // synchronize: true,
  models: [TodoEntity, UserEntity],
};
@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      ...databaseConfig,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true, // Enable GraphQL Playground
    }),
    SequelizeModule.forRoot({
      ...databaseConfig,
      name: 'read',
    }),
    TodosModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestStorageMiddleware).forRoutes('*');
  }
}
