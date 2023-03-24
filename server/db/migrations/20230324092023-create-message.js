'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      textMessage: {
        type: Sequelize.TEXT
      },
      subject: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      clinicName: {
        type: Sequelize.STRING
      },
      doctorName: {
        type: Sequelize.STRING
      },
      dateAppointment: {
        type: Sequelize.DATEONLY
      },
      time: {
        type: Sequelize.STRING
      },
      doctorSpeciality: {
        type: Sequelize.STRING
      },
      dateMessage: {
        type: Sequelize.DATE
      },
      doctorId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Doctors',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      clinicId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Clinics',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messages');
  }
};
