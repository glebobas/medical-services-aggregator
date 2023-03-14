'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Ratings', [
      {
        userId: 1,
        clinicRating: 4,
        doctorRating: 5,
        doctorId: 1,
        clinicId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        clinicRating: 3,
        doctorRating: 2,
        doctorId: 2,
        clinicId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        clinicRating: 5,
        doctorRating: 4,
        doctorId: 3,
        clinicId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Ratings', null, {});

  }
};
