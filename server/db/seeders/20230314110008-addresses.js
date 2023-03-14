'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Addresses', [
       {
         countryName: 'USA',
         cityName: 'New York',
         streetName: '123 Main St',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         countryName: 'Canada',
         cityName: 'Toronto',
         streetName: '456 Maple Ave',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         countryName: 'UK',
         cityName: 'London',
         streetName: '789 Oxford St',
         createdAt: new Date(),
         updatedAt: new Date()
       }
     ], {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Addresses', null, {});

  }
};
