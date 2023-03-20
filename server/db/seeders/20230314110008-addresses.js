'use strict';
const hoaxer = require('hoaxer');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const countries = ['Australia', 'Vietnam', 'Turkey'];
    const addresses = [];

    for (let i = 0; i < 10; i++) {
      const randomNum = hoaxer.datatype.number({ min: 1, max: 10 });
      const countryName = hoaxer.random.arrayElement(countries);
      const cityName = hoaxer.address.city();
      const streetName = randomNum + ' ' + hoaxer.address.streetName();
      const createdAt = new Date();
      const updatedAt = new Date();

      const user = {
        countryName,
        cityName,
        streetName,
        createdAt,
        updatedAt,
      };

      addresses.push(user);
    }

     await queryInterface.bulkInsert('Addresses', addresses, {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('Addresses', null, {});

  }
};






