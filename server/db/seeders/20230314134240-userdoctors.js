'use strict';
const { unique } = require('shorthash');
const hoaxer = require('hoaxer');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {


    const userIds = Array.from({ length: 10 }, (_, i) => i + 1);
    const doctorIds = Array.from({ length: 20 }, (_, i) => i + 1);

    const userDoctorPairs = [];

    while (userDoctorPairs.length < 30) {
      const userId = hoaxer.random.arrayElement(userIds);
      const doctorId = hoaxer.random.arrayElement(doctorIds);
      const pairId = unique(`${userId}-${doctorId}`);

      if (!userDoctorPairs.some(pair => pair.id === pairId)) {
        userDoctorPairs.push({
          userId,
          doctorId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    await queryInterface.bulkInsert('UserDoctors', userDoctorPairs, {});


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserDoctors', null, {});
  }
};


