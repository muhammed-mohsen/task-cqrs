const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const users = [];
    const todos = [];
    for (let i = 0; i < 5; i++) {
      const user = {
        id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      for (let j = 0; j < 5; j++) {
        const todo = {
          id: faker.string.uuid(),
          text: faker.lorem.sentence(),
          userId: user.id,
          status: 'in_progress',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        todos.push(todo);
      }
      users.push(user);
    }

    await queryInterface.bulkInsert('users', users);
    await queryInterface.bulkInsert('todos', todos);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('todos', null, {});
  },
};
