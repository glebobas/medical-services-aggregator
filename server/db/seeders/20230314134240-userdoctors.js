'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserDoctors', [
      {
        userId: 1,
        doctorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        doctorId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        doctorId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserDoctors', null, {});
  }
};
