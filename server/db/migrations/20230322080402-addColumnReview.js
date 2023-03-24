'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Reviews', 'date', {
      type: Sequelize.DATEONLY,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Reviews', 'date');
  }
}
