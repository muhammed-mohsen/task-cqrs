// import { Module } from '@nestjs/common';
// import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
// import { SequelizeOptions } from 'sequelize-typescript';
// import { Config } from 'src/Config';

// import { Sequelize } from 'sequelize';
// import { TodoEntity } from 'src/todo/infrastructure/entity/TodoEntity';
import { v4 } from 'uuid';

// const entities = [TodoEntity];
// export const databaseConfig: SequelizeOptions = {
//   dialect: 'mysql',
//   logging: Config.DATABASE_LOGGING,
//   host: Config.DATABASE_HOST,
//   port: Config.DATABASE_PORT,
//   database: Config.DATABASE_NAME,
//   username: Config.DATABASE_USER,
//   password: Config.DATABASE_PASSWORD,
//   models: entities,
// };
// export const databaseProviders = [
//   {
//     provide: 'WRITE_DATABASE',
//     useFactory: async (): Promise<SequelizeModuleOptions> => {
//       const sequelize = new Sequelize({ ...databaseConfig });
//       await sequelize.sync(); // Sync models with write database
//       return sequelize;
//     },
//   },
//   {
//     provide: 'READ_DATABASE',
//     useFactory: async () => {
//       const sequelize = new Sequelize({ ...databaseConfig });
//       await sequelize.sync(); // Sync models with read database
//       return sequelize;
//     },
//   },
// ];

export class EntityId extends String {
  constructor() {
    super(v4());
  }
}
// example.module.ts

// @Module({
//   imports: [
//     SequelizeModule.forRootAsync({
//       useFactory: () =>
//         databaseProviders.find(
//           (provider) => provider.provide === 'WRITE_DATABASE',
//         ),
//     }),
//     SequelizeModule.forRootAsync({
//       useFactory: () =>
//         databaseProviders.find(
//           (provider) => provider.provide === 'READ_DATABASE',
//         ),
//     }),
//   ],
//   providers: [
//     /* other providers */
//   ],
// })
// export class ExampleModule {}
