'use strict';

const hoaxer = require('hoaxer');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const doctors = [

        {
          id: 1,
          firstName: 'Eleanor',
          lastName: 'Mohr',
          email: 'Eleanor42@gmail.com',
          phone: '+1 355 223 5371',
          specialityId: 5,
          clinicId: 9,
          generalTiming: 'Sunday - Saturday - Wednesday - Friday, 10am - 4pm',
          adultPatients: true,
          childrenPatients: false,
          generalInfo: 'Dr. Eleanor Mohr is a compassionate specialist with expertise in treating anxiety. She specializes in therapy and is skilled in using medication to manage symptoms. Dr. Eleanor Mohr recommends regular exercise and stress management to maintain overall health and prevent future health problems.',
          avatar: 'https://cdn-icons-png.flaticon.com/512/3304/3304567.png',
          createdAt: new Date(),
        updatedAt: new Date()
  },
    {
      id: 2,
          firstName: 'Nancy',
        lastName: 'Thompson',
        email: 'Nancy79@hotmail.com',
        phone: '+1 322 107 2062',
        specialityId: 3,
        clinicId: 2,
        generalTiming: 'Saturday, 11am - 5pm',
        adultPatients: true,
        childrenPatients: false,
        generalInfo: 'Dr. Nancy Thompson is a empathetic physician with expertise in treating anxiety. She specializes in Dermatology and is skilled in using modern therapy to manage symptoms. Dr. Nancy Thompson recommends adequate sleep and a healthy diet to maintain overall health and prevent future health problems.',
        avatar: 'https://cdn-icons-png.flaticon.com/512/3304/3304567.png',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      id: 3,
          firstName: 'Katrina',
        lastName: 'Wisoky',
        email: 'Katrina30@hotmail.com',
        phone: '+1 766 286 6112',
        specialityId: 4,
        clinicId: 5,
        generalTiming: 'Thursday - Monday - Tuesday - Sunday - Wednesday, 11am - 6pm',
        adultPatients: true,
        childrenPatients: true,
        generalInfo: 'Dr. Katrina Wisoky is a skilled practitioner with expertise in treating anxiety. She specializes in surgery and is skilled in using modern surgery to manage symptoms. Dr. Katrina Wisoky recommends adequate sleep and a healthy diet to maintain overall health and prevent future health problems.',
        avatar: 'https://cdn-icons-png.flaticon.com/512/3304/3304567.png',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      id: 4,
          firstName: 'Sheryl',
        lastName: 'Bernhard',
        email: 'Sheryl27@hotmail.com',
        phone: '+1 850 189 9139',
        specialityId: 4,
        clinicId: 7,
        generalTiming: 'Wednesday - Saturday - Monday - Thursday, 10am - 4pm',
        adultPatients: true,
        childrenPatients: false,
        generalInfo: 'Dr. Sheryl Bernhard is a caring practitioner with expertise in treating asthma. She specializes in surgery and is skilled in using modern surgery to manage symptoms. Dr. Sheryl Bernhard recommends stress management and adequate sleep to maintain overall health and prevent future health problems.',
        avatar: 'https://cdn-icons-png.flaticon.com/512/3304/3304567.png',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      id: 5,
          firstName: 'Tracy',
        lastName: 'Hagenes',
        email: 'Tracy_Hagenes@hotmail.com',
        phone: '+1 324 255 3925',
        specialityId: 3,
        clinicId: 3,
        generalTiming: 'Tuesday - Monday - Thursday - Wednesday, 12am - 6pm',
        adultPatients: true,
        childrenPatients: true,
        generalInfo: 'Dr. Tracy Hagenes is a experienced doctor with expertise in treating asthma. He specializes in Dermatology and is skilled in using medication to manage symptoms. Dr. Tracy Hagenes recommends stress management and adequate sleep to maintain overall health and prevent future health problems.',
        avatar: 'https://cdn-icons-png.flaticon.com/512/607/607414.png',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      id: 6,
          firstName: 'Phyllis',
        lastName: 'Heller',
        email: 'Phyllis59@gmail.com',
        phone: '+1 324 172 6875',
        specialityId: 2,
        clinicId: 7,
        generalTiming: 'Wednesday - Monday - Sunday - Thursday - Saturday, 11am - 5pm',
        adultPatients: true,
        childrenPatients: true,
        generalInfo: 'Dr. Phyllis Heller is a skilled specialist with expertise in treating asthma. She specializes in Cardiology and is skilled in using modern therapy to manage symptoms. Dr. Phyllis Heller recommends regular exercise and adequate sleep to maintain overall health and prevent future health problems.',
        avatar: 'https://cdn-icons-png.flaticon.com/512/3304/3304567.png',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      id: 7,
          firstName: 'Jimmy',
        lastName: 'Smitham',
        email: 'Jimmy.Smitham46@gmail.com',
        phone: '+1 457 622 5732',
        specialityId: 4,
        clinicId: 4,
        generalTiming: 'Thursday - Friday - Wednesday - Monday, 10am - 4pm',
        adultPatients: true,
        childrenPatients: true,
        generalInfo: 'Dr. Jimmy Smitham is a knowledgeable practitioner with expertise in treating diabetes. He specializes in surgery and is skilled in using modern surgery to manage symptoms. Dr. Jimmy Smitham recommends a healthy diet and regular exercise to maintain overall health and prevent future health problems.',
        avatar: 'https://cdn-icons-png.flaticon.com/512/607/607414.png',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      id: 8,
          firstName: 'Gail',
        lastName: 'Paucek',
        email: 'Gail86@yahoo.com',
        phone: '+1 261 534 5533',
        specialityId: 1,
        clinicId: 10,
        generalTiming: 'Thursday - Sunday - Monday - Saturday, 12am - 3pm',
        adultPatients: true,
        childrenPatients: true,
        generalInfo: 'Dr. Gail Paucek is a knowledgeable specialist with expertise in treating depression. She specializes in Dentistry and is skilled in using modern therapy to manage symptoms. Dr. Gail Paucek recommends regular exercise and stress management to maintain overall health and prevent future health problems.',
        avatar: 'https://cdn-icons-png.flaticon.com/512/3304/3304567.png',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      id: 9,
          firstName: 'Arlene',
        lastName: 'Douglas',
        email: 'Arlene42@gmail.com',
        phone: '+1 725 360 2644',
        specialityId: 2,
        clinicId: 9,
        generalTiming: 'Saturday - Tuesday - Wednesday - Monday - Thursday, 11am - 1pm',
        adultPatients: true,
        childrenPatients: true,
        generalInfo: 'Dr. Arlene Douglas is a dedicated doctor with expertise in treating heart disease. She specializes in Cardiology and is skilled in using lifestyle changes to manage symptoms. Dr. Arlene Douglas recommends adequate sleep and regular exercise to maintain overall health and prevent future health problems.',
        avatar: 'https://cdn-icons-png.flaticon.com/512/3304/3304567.png',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      id: 10,
          firstName: 'Damon',
        lastName: 'Runolfsdottir',
        email: 'Damon14@gmail.com',
        phone: '+1 498 028 9404',
        specialityId: 4,
        clinicId: 8,
        generalTiming: 'Saturday, 12am - 2pm',
        adultPatients: true,
        childrenPatients: true,
        generalInfo: 'Dr. Damon Runolfsdottir is a experienced specialist with expertise in treating arthritis. He specializes in surgery and is skilled in using modern surgery to manage symptoms. Dr. Damon Runolfsdottir recommends stress management and adequate sleep to maintain overall health and prevent future health problems.',
        avatar: 'https://cdn-icons-png.flaticon.com/512/607/607414.png',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      id: 11,
          firstName: 'Grady',
        lastName: 'Hahn',
        email: 'Grady50@yahoo.com',
        phone: '+1 756 361 8012',
        specialityId: 2,
        clinicId: 4,
        generalTiming: 'Friday - Wednesday - Tuesday - Sunday, 10am - 4pm',
        adultPatients: true,
        childrenPatients: false,
        generalInfo: 'Dr. Grady Hahn is a experienced specialist with expertise in treating heart disease. He specializes in Cardiology and is skilled in using medication to manage symptoms. Dr. Grady Hahn recommends a healthy diet and regular exercise to maintain overall health and prevent future health problems.',
        avatar: 'https://cdn-icons-png.flaticon.com/512/607/607414.png',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      id: 12,
          firstName: 'Alex',
        lastName: 'Swaniawski',
        email: 'Alex33@yahoo.com',
        phone: '+1 123 929 6973',
        specialityId: 2,
        clinicId: 2,
        generalTiming: 'Tuesday - Wednesday - Sunday - Monday - Saturday, 11am - 4pm',
        adultPatients: false,
        childrenPatients: true,
        generalInfo: 'Dr. Alex Swaniawski is a experienced specialist with expertise in treating sleep disorders. He specializes in Cardiology and is skilled in using modern surgery to manage symptoms. Dr. Alex Swaniawski recommends a healthy diet and stress management to maintain overall health and prevent future health problems.',
        avatar: 'https://cdn-icons-png.flaticon.com/512/607/607414.png',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      id: 13,
          firstName: 'Shannon',
        lastName: 'Wehner',
        email: 'Shannon_Wehner80@hotmail.com',
        phone: '+1 217 475 8145',
        specialityId: 1,
        clinicId: 4,
        generalTiming: 'Wednesday - Thursday - Tuesday - Saturday - Monday, 12am - 3pm',
        adultPatients: true,
        childrenPatients: true,
        generalInfo: 'Dr. Shannon Wehner is a experienced doctor with expertise in treating anxiety. She specializes in Dentistry and is skilled in using modern therapy to manage symptoms. Dr. Shannon Wehner recommends adequate sleep and regular exercise to maintain overall health and prevent future health problems.',
        avatar: 'https://cdn-icons-png.flaticon.com/512/3304/3304567.png',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      id: 14,
          firstName: 'Flora',
        lastName: 'Hilpert',
        email: 'Flora57@gmail.com',
        phone: '+1 385 141 8884',
        specialityId: 4,
        clinicId: 5,
        generalTiming: 'Thursday - Sunday, 11am - 5pm',
        adultPatients: true,
        childrenPatients: false,
        generalInfo: 'Dr. Flora Hilpert is a caring doctor with expertise in treating diabetes. She specializes in surgery and is skilled in using modern surgery to manage symptoms. Dr. Flora Hilpert recommends a healthy diet and stress management to maintain overall health and prevent future health problems.',
        avatar: 'https://cdn-icons-png.flaticon.com/512/3304/3304567.png',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      id: 15,
          firstName: 'Alfonso',
        lastName: 'Schultz',
        email: 'Alfonso13@hotmail.com',
        phone: '+1 969 918 4048',
        specialityId: 5,
        clinicId: 10,
        generalTiming: 'Monday - Sunday - Thursday - Saturday, 10am - 6pm',
        adultPatients: true,
        childrenPatients: true,
        generalInfo: 'Dr. Alfonso Schultz is a knowledgeable practitioner with expertise in treating skin conditions. He specializes in therapy and is skilled in using modern surgery to manage symptoms. Dr. Alfonso Schultz recommends regular exercise and stress management to maintain overall health and prevent future health problems.',
        avatar: 'https://cdn-icons-png.flaticon.com/512/607/607414.png',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      id: 16,
          firstName: 'Charlie',
        lastName: 'Sauer',
        email: 'Charlie56@yahoo.com',
        phone: '+1 699 692 8867',
        specialityId: 4,
        clinicId: 6,
        generalTiming: 'Thursday - Monday - Saturday - Friday - Wednesday, 10am - 1pm',
        adultPatients: true,
        childrenPatients: true,
        generalInfo: 'Dr. Charlie Sauer is a dedicated practitioner with expertise in treating digestive problems. He specializes in surgery and is skilled in using lifestyle changes to manage symptoms. Dr. Charlie Sauer recommends regular exercise and adequate sleep to maintain overall health and prevent future health problems.',
        avatar: 'https://cdn-icons-png.flaticon.com/512/607/607414.png',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      id: 17,
          firstName: 'Doreen',
        lastName: 'Stanton',
        email: 'Doreen36@gmail.com',
        phone: '+1 280 144 1011',
        specialityId: 1,
        clinicId: 9,
        generalTiming: 'Wednesday - Tuesday, 11am - 3pm',
        adultPatients: true,
        childrenPatients: true,
        generalInfo: 'Dr. Doreen Stanton is a dedicated doctor with expertise in treating anxiety. She specializes in Dentistry and is skilled in using modern therapy to manage symptoms. Dr. Doreen Stanton recommends regular exercise and adequate sleep to maintain overall health and prevent future health problems.',
        avatar: 'https://cdn-icons-png.flaticon.com/512/3304/3304567.png',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      id: 18,
          firstName: 'Shaun',
        lastName: 'Nader',
        email: 'Shaun53@yahoo.com',
        phone: '+1 007 169 8286',
        specialityId: 2,
        clinicId: 1,
        generalTiming: 'Thursday, 11am - 2pm',
        adultPatients: true,
        childrenPatients: true,
        generalInfo: 'Dr. Shaun Nader is a attentive practitioner with expertise in treating asthma. He specializes in Cardiology and is skilled in using modern therapy to manage symptoms. Dr. Shaun Nader recommends adequate sleep and stress management to maintain overall health and prevent future health problems.',
        avatar: 'https://cdn-icons-png.flaticon.com/512/607/607414.png',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      id: 19,
          firstName: 'Ira',
        lastName: 'Boyle',
        email: 'Ira55@hotmail.com',
        phone: '+1 282 815 5382',
        specialityId: 2,
        clinicId: 8,
        generalTiming: 'Sunday - Tuesday - Friday, 10am - 3pm',
        adultPatients: false,
        childrenPatients: true,
        generalInfo: 'Dr. Ira Boyle is a dedicated practitioner with expertise in treating digestive problems. He specializes in Cardiology and is skilled in using medication to manage symptoms. Dr. Ira Boyle recommends a healthy diet and regular exercise to maintain overall health and prevent future health problems.',
        avatar: 'https://cdn-icons-png.flaticon.com/512/607/607414.png',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
      id: 20,
          firstName: 'Wilson',
        lastName: 'Shanahan',
        email: 'Wilson.Shanahan@gmail.com',
        phone: '+1 653 732 1242',
        specialityId: 5,
        clinicId: 4,
        generalTiming: 'Wednesday - Tuesday - Sunday - Thursday, 11am - 2pm',
        adultPatients: true,
        childrenPatients: true,
        generalInfo: 'Dr. Wilson Shanahan is a experienced doctor with expertise in treating digestive problems. He specializes in therapy and is skilled in using medication to manage symptoms. Dr. Wilson Shanahan recommends regular exercise and a healthy diet to maintain overall health and prevent future health problems.',
        avatar: 'https://cdn-icons-png.flaticon.com/512/607/607414.png',
        createdAt: new Date(),
        updatedAt: new Date()
    }


  ]
    //
    //
    // const genders = ['male', 'female'];
    //
    // const clinics = [...Array(10)].map((_, i) => i + 1);
    //
    // const getRandomGenderAvatar = (gender) => {
    //   if (gender === 'male') {
    //     return 'https://cdn-icons-png.flaticon.com/512/607/607414.png';
    //   } else {
    //     return 'https://cdn-icons-png.flaticon.com/512/3304/3304567.png';
    //   }
    // };
    //
    // const getRandomGeneralTiming = () => {
    //   const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    //   const startHour = hoaxer.datatype.number({ min: 10, max: 12 });
    //   const endHour = hoaxer.datatype.number({ min: 13, max: 18 });
    //   const startTime = `${startHour}am`;
    //   const endTime = `${endHour - 12}pm`;
    //   const days = hoaxer.random.arrayElements(daysOfWeek, hoaxer.random.number({ min: 1, max: 5 }));
    //   return `${days.join(' - ')}, ${startTime} - ${endTime}`;
    // };
    //
    // function generateGeneralInfo(firstName, lastName, specialityId, gender) {
    //   const illnesses = ['heart disease', 'diabetes', 'skin conditions', 'depression', 'anxiety', 'cancer', 'asthma', 'arthritis', 'digestive problems', 'sleep disorders'];
    //   const treatments = ['medication', 'lifestyle changes', 'modern surgery', 'modern therapy'];
    //   const recommendations = ['a healthy diet', 'regular exercise', 'stress management', 'adequate sleep'];
    //   const adjectives = ['compassionate', 'caring', 'knowledgeable', 'attentive', 'skilled', 'dedicated', 'experienced', 'empathetic'];
    //   let speciality;
    //   let human;
    //   const nouns = ['doctor', 'physician', 'specialist', 'practitioner'];
    //   if (specialityId === 1) {
    //     speciality = 'Dentistry'
    //   }
    //   if (specialityId === 2) {
    //     speciality = 'Cardiology'
    //   }
    //   if (specialityId === 3) {
    //     speciality = 'Dermatology'
    //   }
    //   if (specialityId === 4) {
    //     speciality = 'surgery'
    //   }
    //   if (specialityId === 5) {
    //     speciality = 'therapy'
    //   }
    //   if (gender === 'male') {
    //     human = 'He'
    //   }
    //   if (gender === 'female') {
    //     human = 'She'
    //   }
    //
    //   const illness = hoaxer.random.arrayElement(illnesses);
    //   const treatment = hoaxer.random.arrayElement(treatments);
    //   const recommendation1 = hoaxer.random.arrayElement(recommendations);
    //   let recommendation2 = hoaxer.random.arrayElement(recommendations);
    //   while (recommendation2 === recommendation1) {
    //     recommendation2 = hoaxer.random.arrayElement(recommendations);
    //   }
    //   const adjective = hoaxer.random.arrayElement(adjectives);
    //   const noun = hoaxer.random.arrayElement(nouns);
    //
    //   return `Dr. ${firstName} ${lastName} is a ${adjective} ${noun} with expertise in treating ${illness}. ${human} specializes in ${speciality} and is skilled in using ${treatment} to manage symptoms. Dr. ${firstName} ${lastName} recommends ${recommendation1} and ${recommendation2} to maintain overall health and prevent future health problems.`;
    // }
    //
    // const doctors = [...Array(20)].map((_, i) => {
    //   const isAdult = hoaxer.random.arrayElement([true, false]);
    //   const isChild = hoaxer.random.arrayElement([true, false]);
    //
    //   const gender = hoaxer.random.arrayElement(genders);
    //   const firstName = hoaxer.name.firstName(gender);
    //   const lastName = hoaxer.name.lastName();
    //   const email = hoaxer.internet.email(firstName, lastName);
    //   const phone = hoaxer.phone.phoneNumber('+1 ### ### ####');
    //   const specialityId = hoaxer.datatype.number({ min: 1, max: 5 });
    //   const clinicId = hoaxer.random.arrayElement(clinics);
    //   const generalTiming = getRandomGeneralTiming();
    //   const adultPatients = isAdult || isChild ? isAdult : true;
    //   const childrenPatients = isAdult || isChild ? isChild : true;
    //   const generalInfo = generateGeneralInfo(firstName, lastName, specialityId, gender);
    //   const avatar = getRandomGenderAvatar(gender);
    //   const createdAt = new Date();
    //   const updatedAt = new Date();
    //   return {
    //     firstName,
    //     lastName,
    //     email,
    //     phone,
    //     specialityId,
    //     clinicId,
    //     generalTiming,
    //     adultPatients,
    //     childrenPatients,
    //     generalInfo,
    //     avatar,
    //     createdAt,
    //     updatedAt,
    //   };
    // });

    await queryInterface.bulkInsert('Doctors', doctors, {});

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Doctors', null, {});

  }
};





