'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      {
        username: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: '12345',
        telephone: '+1 555-1234',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'jane_smith',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: '1245',
        telephone: '+1 555-5678',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'jimmy_jones',
        firstName: 'Jimmy',
        lastName: 'Jones',
        email: 'jimmy.jones@example.com',
        password: '123',
        telephone: '+1 555-9012',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: '1234',
        telephone: '+1 555-5555',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Users', users);

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {});

  }
};
