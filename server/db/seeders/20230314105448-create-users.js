'use strict';

const hoaxer = require('hoaxer');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const users = []
    for (let i = 0; i < 10; i++) {
      const username = hoaxer.internet.userName();
      const firstName = hoaxer.name.firstName();
      const lastName = hoaxer.name.lastName();
      const email = hoaxer.internet.email();
      const password = hoaxer.internet.password();
      const telephone = hoaxer.phone.phoneNumberFormat();
      const role = 'user';
      const createdAt = new Date();
      const updatedAt = new Date();

      const user = {
        username,
        firstName,
        lastName,
        email,
        password,
        telephone,
        role,
        createdAt,
        updatedAt,
      };

      users.push(user);
    }

    await queryInterface.bulkInsert('Users', users);

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {});

  }
};




