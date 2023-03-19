'use strict';

const hoaxer = require('hoaxer');
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const users = []
    for (let i = 0; i < 10; i++) {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash('123', saltRounds);
      const username = hoaxer.internet.userName();
      const firstName = hoaxer.name.firstName();
      const lastName = hoaxer.name.lastName();
      const email = hoaxer.internet.email();
      const telephone = hoaxer.phone.phoneNumberFormat();
      const role = 'user';
      const createdAt = new Date();
      const updatedAt = new Date();

      const user = {
        username,
        firstName,
        lastName,
        email,
        password: passwordHash,
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




