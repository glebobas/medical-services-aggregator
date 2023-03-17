'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {


     await queryInterface.bulkInsert('Clinics', [
       {
         name: 'Healthy Life Clinic',
         addressId: 1,
         phone: '+1 555-1234',
         email: 'info@healthylifeclinic.com',
         generalnfo: 'We provide high-quality medical care.',
         avatar: 'https://cdn-icons-png.flaticon.com/512/4320/4320371.png',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         name: 'Sunrise Medical Center',
         addressId: 2,
         phone: '+1 555-5678',
         email: 'info@sunrisemedical.com',
         generalnfo: 'Your health is our top priority.',
         avatar: 'https://cdn-icons-png.flaticon.com/512/9874/9874871.png',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         name: 'City Hospital',
         addressId: 3,
         phone: '+1 555-9012',
         email: 'info@cityhospital.com',
         generalnfo: 'Compassionate care, advanced medicine.',
         avatar: 'https://cdn-icons-png.flaticon.com/512/9434/9434725.png',
         createdAt: new Date(),
         updatedAt: new Date()
       }
     ], {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Clinics', null, {});

  }
};
