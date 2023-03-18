'use strict';
const hoaxer = require('hoaxer');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const doctorIds = Array.from({ length: 20 }, (_, i) => i + 1);
    const clinicIds = Array.from({ length: 10 }, (_, i) => i + 1);

    const ratings = [];

    for (let i = 1; i <= 100; i++) {
      const userId = hoaxer.datatype.number({ min: 1, max: 10 });
      let doctorRating = hoaxer.datatype.number({ min: 1, max: 5 });
      let clinicRating = hoaxer.datatype.number({ min: 1, max: 5 });
      let doctorId = hoaxer.random.arrayElement(doctorIds.concat([null]));
      let clinicId = hoaxer.random.arrayElement(clinicIds.concat([null]));

      // If doctorId is null, doctorRating must also be null
      if (doctorId === null) {
        doctorRating = null;
      }

      // If clinicId is null, clinicRating must also be null
      if (clinicId === null) {
        clinicRating = null;
      }

      const existingRating = ratings.find(rating => rating.userId === userId && rating.doctorId === doctorId && rating.clinicId === clinicId);

      if (!existingRating) {
        ratings.push({
          userId,
          doctorRating,
          clinicRating,
          doctorId,
          clinicId,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }
    await queryInterface.bulkInsert('Ratings', ratings, {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Ratings', null, {});

  }
};





