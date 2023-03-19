'use strict';

const hoaxer = require('hoaxer');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {


    const genders = ['male', 'female'];

    const clinics = [...Array(10)].map((_, i) => i + 1);

    const getRandomGenderAvatar = (gender) => {
      if (gender === 'male') {
        return 'https://cdn-icons-png.flaticon.com/512/607/607414.png';
      } else {
        return 'https://cdn-icons-png.flaticon.com/512/3304/3304567.png';
      }
    };

    const getRandomGeneralTiming = () => {
      const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const startHour = hoaxer.random.number({ min: 8, max: 12 });
      const endHour = hoaxer.random.number({ min: 13, max: 18 });
      const startTime = `${startHour}am`;
      const endTime = `${endHour - 12}pm`;
      const days = hoaxer.random.arrayElements(daysOfWeek, hoaxer.random.number({ min: 1, max: 5 }));
      return `${days.join(' - ')}, ${startTime} - ${endTime}`;
    };

    function generateGeneralInfo(firstName, lastName, specialityId, gender) {
      const illnesses = ['heart disease', 'diabetes', 'skin conditions', 'depression', 'anxiety', 'cancer', 'asthma', 'arthritis', 'digestive problems', 'sleep disorders'];
      const treatments = ['medication', 'lifestyle changes', 'modern surgery', 'modern therapy'];
      const recommendations = ['a healthy diet', 'regular exercise', 'stress management', 'adequate sleep'];
      const adjectives = ['compassionate', 'caring', 'knowledgeable', 'attentive', 'skilled', 'dedicated', 'experienced', 'empathetic'];
      let speciality;
      let human;
      const nouns = ['doctor', 'physician', 'specialist', 'practitioner'];
      if (specialityId === 1) {
        speciality = 'Dentistry'
      }
      if (specialityId === 2) {
        speciality = 'Cardiology'
      }
      if (specialityId === 3) {
        speciality = 'Dermatology'
      }
      if (specialityId === 4) {
        speciality = 'surgery'
      }
      if (specialityId === 5) {
        speciality = 'therapy'
      }
      if (gender === 'male') {
        human = 'He'
      }
      if (gender === 'female') {
        human = 'She'
      }

      const illness = hoaxer.random.arrayElement(illnesses);
      const treatment = hoaxer.random.arrayElement(treatments);
      const recommendation1 = hoaxer.random.arrayElement(recommendations);
      let recommendation2 = hoaxer.random.arrayElement(recommendations);
      while (recommendation2 === recommendation1) {
        recommendation2 = hoaxer.random.arrayElement(recommendations);
      }
      const adjective = hoaxer.random.arrayElement(adjectives);
      const noun = hoaxer.random.arrayElement(nouns);

      return `Dr. ${firstName} ${lastName} is a ${adjective} ${noun} with expertise in treating ${illness}. ${human} specializes in ${speciality} and is skilled in using ${treatment} to manage symptoms. Dr. ${firstName} ${lastName} recommends ${recommendation1} and ${recommendation2} to maintain overall health and prevent future health problems.`;
    }

    const doctors = [...Array(20)].map((_, i) => {
      const isAdult = hoaxer.random.arrayElement([true, false]);
      const isChild = hoaxer.random.arrayElement([true, false]);

      const gender = hoaxer.random.arrayElement(genders);
      const firstName = hoaxer.name.firstName(gender);
      const lastName = hoaxer.name.lastName();
      const email = hoaxer.internet.email(firstName, lastName);
      const phone = hoaxer.phone.phoneNumber('+1 ### ### ####');
      const specialityId = hoaxer.random.number({ min: 1, max: 5 });
      const clinicId = hoaxer.random.arrayElement(clinics);
      const generalTiming = getRandomGeneralTiming();
      const adultPatients = isAdult || isChild ? isAdult : true;
      const childrenPatients = isAdult || isChild ? isChild : true;
      const generalInfo = generateGeneralInfo(firstName, lastName, specialityId, gender);
      const avatar = getRandomGenderAvatar(gender);
      const createdAt = new Date();
      const updatedAt = new Date();
      return {
        firstName,
        lastName,
        email,
        phone,
        specialityId,
        clinicId,
        generalTiming,
        adultPatients,
        childrenPatients,
        generalInfo,
        avatar,
        createdAt,
        updatedAt,
      };
    });

    await queryInterface.bulkInsert('Doctors', doctors, {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Doctors', null, {});

  }
};





