'use strict';
const hoaxer = require('hoaxer');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        const clinics = [];
        for (let i = 1; i <= 10; i++) {
            const name = `${hoaxer.company.companyName()} Clinic`;
            const addressId = i;
            const phone = hoaxer.phone.phoneNumberFormat();
            const email = hoaxer.internet.email();
            const generalnfo = `At ${name}, we are committed to providing high-quality medical care in a 
            comfortable and welcoming environment. Our experienced doctors and nurses specialize in a wide range of fields, 
            from primary care to specialized treatments for complex medical conditions. We believe in treating every patient with compassion, 
            respect, and dignity, and we are dedicated to improving the health and well-being of our community. Contact us today to schedule an 
            appointment or learn more about our services.`;
            const createdAt = new Date();
            const updatedAt = new Date();

            const clinic = {
                name,
                addressId,
                phone,
                email,
                generalnfo,
                avatar: 'https://cdn-icons-png.flaticon.com/512/4320/4320371.png',
                createdAt,
                updatedAt,
            };

            clinics.push(clinic);
        }


        await queryInterface.bulkInsert('Clinics', clinics, {});

    },

    async down(queryInterface, Sequelize) {

        await queryInterface.bulkDelete('Clinics', null, {});

    }
};
