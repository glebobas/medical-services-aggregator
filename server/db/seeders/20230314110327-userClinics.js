'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const userClinicPairs = [];


    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        if (i !== j) {
          userClinicPairs.push({ userId: i, clinicId: j });
        }
      }
    }

    for (let i = userClinicPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [userClinicPairs[i], userClinicPairs[j]] = [userClinicPairs[j], userClinicPairs[i]];
    }

    for (const pair of userClinicPairs.slice(0, 20)) {
      const userId = pair.userId;
      const clinicId = pair.clinicId;
      const createdAt = new Date();
      const updatedAt = new Date();


     await queryInterface.bulkInsert('UserClinics', [{ userId, clinicId, createdAt, updatedAt }], {});

    }



  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('UserClinics', null, {});

  }
};


