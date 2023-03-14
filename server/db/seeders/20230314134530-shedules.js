'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const Shedules = [
      {
        date: new Date(),
        slotId: 1,
        doctorId: 1,
        userId: 1,
        statusAppointment: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: new Date(),
        slotId: 2,
        doctorId: 2,
        userId: 2,
        statusAppointment: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: new Date(),
        slotId: 3,
        doctorId: 1,
        userId: 3,
        statusAppointment: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];


      await queryInterface.bulkInsert('Shedules', Shedules, {});


  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Shedules', null, {});

  }
};
