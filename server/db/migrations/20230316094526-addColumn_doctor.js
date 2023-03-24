'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Doctors', 'avatar', {
            type: Sequelize.STRING,
        });
        await queryInterface.addColumn('Clinics', 'avatar', {
            type: Sequelize.STRING,
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Doctors', 'avatar');
        await queryInterface.removeColumn('Clinics', 'avatar');
    }
}
