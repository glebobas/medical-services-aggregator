'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Specialities', [
       {
         name: 'Dentist',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         name: 'Cardiologist',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         name: 'Dermatologist',
         createdAt: new Date(),
         updatedAt: new Date()
       }
     ], {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Specialities', null, {});

  }
};
