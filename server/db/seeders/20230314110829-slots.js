'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Slots', [
       {
         timeGap: '10:00 - 11:00',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         timeGap: '11:00 - 12:00',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         timeGap: '12:00 - 13:00',
         createdAt: new Date(),
         updatedAt: new Date()
       }
     ], {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Slots', null, {});

  }
};
