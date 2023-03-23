'use strict';
const hoaxer = require('hoaxer');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const clinics = [
                {
                    id: 1,
                    name: 'Erdman and Sons Clinic',
                    addressId: 1,
                    phone: '992-630-5203',
                    email: 'Gia_Stanton82@gmail.com',
                    generalnfo: 'At Erdman and Sons Clinic, we are committed to providing high-quality medical care in a comfortable and welcoming environment. Our experienced doctors and nurses specialize in a wide range of fields, from primary care to specialized treatments for complex medical conditions. We believe in treating every patient with compassion, respect, and dignity, and we are dedicated to improving the health and well-being of our community. Contact us today to schedule an appointment or learn more about our services.',
                    avatar: 'https://cdn-icons-png.flaticon.com/512/4320/4320371.png',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 2,
                    name: 'Leffler LLC Clinic',
                    addressId: 2,
                    phone: '653-861-3559',
                    email: 'Opal_Parisian3@hotmail.com',
                    generalnfo: 'At Leffler LLC Clinic, we are committed to providing high-quality medical care in a comfortable and welcoming environment. Our experienced doctors and nurses specialize in a wide range of fields, from primary care to specialized treatments for complex medical conditions. We believe in treating every patient with compassion, respect, and dignity, and we are dedicated to improving the health and well-being of our community. Contact us today to schedule an appointment or learn more about our services.',
                    avatar: 'https://cdn-icons-png.flaticon.com/512/4320/4320371.png',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 3,
                    name: 'Pacocha - Graham Clinic',
                    addressId: 3,
                    phone: '403-400-7139',
                    email: 'Lorenzo_Boyer37@hotmail.com',
                    generalnfo: 'At Pacocha - Graham Clinic, we are committed to providing high-quality medical care in a comfortable and welcoming environment. Our experienced doctors and nurses specialize in a wide range of fields, from primary care to specialized treatments for complex medical conditions. We believe in treating every patient with compassion, respect, and dignity, and we are dedicated to improving the health and well-being of our community. Contact us today to schedule an appointment or learn more about our services.',
                    avatar: 'https://cdn-icons-png.flaticon.com/512/4320/4320371.png',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 4,
                    name: 'Predovic - Bogisich Clinic',
                    addressId: 4,
                    phone: '406-728-7336',
                    email: 'Oda_Waelchi43@hotmail.com',
                    generalnfo: 'At Predovic - Bogisich Clinic, we are committed to providing high-quality medical care in a comfortable and welcoming environment. Our experienced doctors and nurses specialize in a wide range of fields, from primary care to specialized treatments for complex medical conditions. We believe in treating every patient with compassion, respect, and dignity, and we are dedicated to improving the health and well-being of our community. Contact us today to schedule an appointment or learn more about our services.',
                    avatar: 'https://cdn-icons-png.flaticon.com/512/4320/4320371.png',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 5,
                    name: 'Lang Group Clinic',
                    addressId: 5,
                    phone: '402-221-2559',
                    email: 'Enola.Legros@hotmail.com',
                    generalnfo: 'At Lang Group Clinic, we are committed to providing high-quality medical care in a comfortable and welcoming environment. Our experienced doctors and nurses specialize in a wide range of fields, from primary care to specialized treatments for complex medical conditions. We believe in treating every patient with compassion, respect, and dignity, and we are dedicated to improving the health and well-being of our community. Contact us today to schedule an appointment or learn more about our services.',
                    avatar: 'https://cdn-icons-png.flaticon.com/512/4320/4320371.png',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 6,
                    name: "O'Connell, Rolfson and Bechtelar Clinic",
                    addressId: 6,
                    phone: '221-939-7056',
                    email: 'Kennedy_Tillman@hotmail.com',
                    generalnfo: "At O'Connell, Rolfson and Bechtelar Clinic, we are committed to providing high-quality medical care in a comfortable and welcoming environment. Our experienced doctors and nurses specialize in a wide range of fields, from primary care to specialized treatments for complex medical conditions. We believe in treating every patient with compassion, respect, and dignity, and we are dedicated to improving the health and well-being of our community. Contact us today to schedule an appointment or learn more about our services.",
                    avatar: 'https://cdn-icons-png.flaticon.com/512/4320/4320371.png',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 7,
                    name: 'Reilly Group Clinic',
                    addressId: 7,
                    phone: '598-383-5900',
                    email: 'Gretchen_Mann71@hotmail.com',
                    generalnfo: 'At Reilly Group Clinic, we are committed to providing high-quality medical care in a comfortable and welcoming environment. Our experienced doctors and nurses specialize in a wide range of fields, from primary care to specialized treatments for complex medical conditions. We believe in treating every patient with compassion, respect, and dignity, and we are dedicated to improving the health and well-being of our community. Contact us today to schedule an appointment or learn more about our services.',
                    avatar: 'https://cdn-icons-png.flaticon.com/512/4320/4320371.png',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 8,
                    name: 'Okuneva - Bogisich Clinic',
                    addressId: 8,
                    phone: '667-292-5110',
                    email: 'Mozelle.Kunde@gmail.com',
                    generalnfo: 'At Okuneva - Bogisich Clinic, we are committed to providing high-quality medical care in a comfortable and welcoming environment. Our experienced doctors and nurses specialize in a wide range of fields, from primary care to specialized treatments for complex medical conditions. We believe in treating every patient with compassion, respect, and dignity, and we are dedicated to improving the health and well-being of our community. Contact us today to schedule an appointment or learn more about our services.',
                    avatar: 'https://cdn-icons-png.flaticon.com/512/4320/4320371.png',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 9,
                    name: 'Mueller, Huel and Goodwin Clinic',
                    addressId: 9,
                    phone: '880-258-3098',
                    email: 'Theo_Denesik5@gmail.com',
                    generalnfo: 'At Mueller, Huel and Goodwin Clinic, we are committed to providing high-quality medical care in a comfortable and welcoming environment. Our experienced doctors and nurses specialize in a wide range of fields, from primary care to specialized treatments for complex medical conditions. We believe in treating every patient with compassion, respect, and dignity, and we are dedicated to improving the health and well-being of our community. Contact us today to schedule an appointment or learn more about our services.',
                    avatar: 'https://cdn-icons-png.flaticon.com/512/4320/4320371.png',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: 10,
                    name: 'Ryan - Waelchi Clinic',
                    addressId: 10,
                    phone: '827-647-2957',
                    email: 'Salvatore.Farrell34@yahoo.com',
                    generalnfo: 'At Ryan - Waelchi Clinic, we are committed to providing high-quality medical care in a comfortable and welcoming environment. Our experienced doctors and nurses specialize in a wide range of fields, from primary care to specialized treatments for complex medical conditions. We believe in treating every patient with compassion, respect, and dignity, and we are dedicated to improving the health and well-being of our community. Contact us today to schedule an appointment or learn more about our services.',
                    avatar: 'https://cdn-icons-png.flaticon.com/512/4320/4320371.png',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ]
        ;


        // const clinics = [];
        // for (let i = 1; i <= 10; i++) {
        //     const name = `${hoaxer.company.companyName()} Clinic`;
        //     const addressId = i;
        //     const phone = hoaxer.phone.phoneNumberFormat();
        //     const email = hoaxer.internet.email();
        //     const generalnfo = `At ${name}, we are committed to providing high-quality medical care in a
        //     comfortable and welcoming environment. Our experienced doctors and nurses specialize in a wide range of fields,
        //     from primary care to specialized treatments for complex medical conditions. We believe in treating every patient with compassion,
        //     respect, and dignity, and we are dedicated to improving the health and well-being of our community. Contact us today to schedule an
        //     appointment or learn more about our services.`;
        //     const createdAt = new Date();
        //     const updatedAt = new Date();
        //
        //     const clinic = {
        //         name,
        //         addressId,
        //         phone,
        //         email,
        //         generalnfo,
        //         avatar: 'https://cdn-icons-png.flaticon.com/512/4320/4320371.png',
        //         createdAt,
        //         updatedAt,
        //     };
        //
        //     clinics.push(clinic);
        // }


        await queryInterface.bulkInsert('Clinics', clinics, {});

    },

    async down(queryInterface, Sequelize) {

        await queryInterface.bulkDelete('Clinics', null, {});

    }
};
