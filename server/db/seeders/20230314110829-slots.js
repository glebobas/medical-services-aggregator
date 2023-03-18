'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const slots = [];

    for (let hour = 9; hour < 18; hour++) {
      const slotStart = `${hour}:00`;
      const slotEnd = `${hour + 1}:00`;
      const timeGap = `${slotStart} - ${slotEnd}`;
      const slot = {
        timeGap,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      slots.push(slot);
    }

     await queryInterface.bulkInsert('Slots', slots, {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Slots', null, {});

  }
};






