import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { RequestStorageMiddleware } from 'libs/RequestStorageMiddleware';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todo/TodoModule';
import { TodoEntity } from './todo/infrastructure/entity/TodoEntity';
import { UsersModule } from './user/UserModule';
import { UserEntity } from './user/infrastructure/entity/UserEntity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        host: config.get('DATABASE_HOST'),
        dialect: 'mysql',
        port: config.get('DATABASE_PORT'),
        username: config.get('DATABASE_USER'),
        password: config.get('DATABASE_PASSWORD'),

        database: config.get('DATABASE_NAME'),
        replication: {
          read: [
            {
              host: config.get('DATABASE_HOST'),
              username: config.get('DATABASE_USER'),
              password: config.get('DATABASE_PASSWORD'),
            },
          ],
          write: {
            host: config.get('DATABASE_HOST'),
            username: config.get('DATABASE_USER'),
            password: config.get('DATABASE_PASSWORD'),
          },
        },
        models: [TodoEntity, UserEntity],
      }),
      // replication: {
      //   read: [
      //     {
      //       host: '8.8.8.8',
      //       username: 'read-1-username',
      //       password: process.env.READ_DB_1_PW,
      //     },
      //   ],
      //   write: {
      //     host: '1.1.1.1',
      //     username: 'write-username',
      //     password: process.env.WRITE_DB_PW,
      //   },
      // },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true, // Enable GraphQL Playground
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
