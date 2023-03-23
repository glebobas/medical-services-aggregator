'use strict';
const hoaxer = require('hoaxer');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    function generateSchedule() {
      const statuses = ['pending', 'done', 'cancelled', 'vacant'];
      const dates = {
        pendingOrVacant: {
          min: '2023-03-25',
          max: '2023-03-27',
        },
        cancelled: {
          min: '2023-03-23',
          max: '2023-03-25',
        },
        done: {
          min: '2023-03-21',
          max: '2022-03-23',
        },
      };
      const rows = [];
      for (let i = 1; i <= 20; i++) {
        const doctorId = i;
        const usedSlotIds = new Set();
        while (usedSlotIds.size < 8) {
          const slotId = hoaxer.datatype.number({ min: 1, max: 8 });
          if (usedSlotIds.has(slotId)) continue;
          usedSlotIds.add(slotId);
          const statusAppointment = hoaxer.random.arrayElement(statuses);
          const userId = (statusAppointment !== 'vacant') ? hoaxer.datatype.number({ min: 1, max: 10 }) : null;
          let date;
          if (statusAppointment === 'pending' || statusAppointment === 'vacant') {
            date = hoaxer.date.between(dates.pendingOrVacant.min, dates.pendingOrVacant.max);
          } else if (statusAppointment === 'cancelled') {
            date = hoaxer.date.between(dates.cancelled.min, dates.cancelled.max);
          } else {
            date = hoaxer.date.between(dates.done.min, dates.done.max);
          }
          const row = {
            date: date.toISOString().slice(0, 10),
            slotId,
            doctorId,
            userId,
            statusAppointment,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          rows.push(row);
        }
      }
      return rows;
    }



      await queryInterface.bulkInsert('Shedules', generateSchedule(), {});


  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Shedules', null, {});

  }
};



