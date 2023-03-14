'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Doctors', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      phone: '+1 123 456 7890',
      specialityId: 1,
      clinicId: 1,
      generalTiming: 'Monday - Friday, 8am - 5pm',
      adultPatients: true,
      childrenPatients: true,
      generalInfo: 'Dr. John Doe is a licensed physician with over 10 years of experience in general medicine.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'janesmith@example.com',
      phone: '+1 987 654 3210',
      specialityId: 2,
      clinicId: 2,
      generalTiming: 'Monday - Friday, 9am - 6pm',
      adultPatients: true,
      childrenPatients: false,
      generalInfo: 'Dr. Jane Smith is a board-certified pediatrician with a focus on adolescent health.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bobjohnson@example.com',
      phone: '+1 555 555 5555',
      specialityId: 3,
      clinicId: 3,
      generalTiming: 'Monday - Friday, 10am - 7pm',
      adultPatients: false,
      childrenPatients: true,
      generalInfo: 'Dr. Bob Johnson is a dermatologist with a special interest in skin cancer prevention.',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Doctors', null, {});

  }
};
