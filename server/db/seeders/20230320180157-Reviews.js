'use strict';

const hoaxer = require("hoaxer");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    // const doctorIds = Array.from({ length: 20 }, (_, i) => i + 1);
    // const clinicIds = Array.from({ length: 10 }, (_, i) => i + 1);
    //
    // const reviews = []
    //
    // for (let i = 1; i <= 100; i++) {
    //   const userId = hoaxer.datatype.number({ min: 1, max: 10 });
    //   let doctor_review = null;
    //   let clinic_review = null;
    //   let doctorId = hoaxer.random.arrayElement(doctorIds.concat([null]));
    //   let clinicId = hoaxer.random.arrayElement(clinicIds.concat([null]));
    //
    //
    //   if (doctorId === null) {
    //     doctor_review = null;
    //   }
    //
    //
    //   if (clinicId === null) {
    //     clinic_review = null;
    //   }
    //
    //   const rating = hoaxer.datatype.number({ min: 1, max: 10 });
    //
    //   switch (rating) {
    //     case 1:
    //       doctor_review = "Terrible experience with this doctor";
    //       clinic_review = "Terrible experience with this clinic";
    //       break;
    //     case 2:
    //       doctor_review = "Very disappointing visit with this doctor";
    //       clinic_review = "Very disappointing visit with this clinic";
    //       break;
    //     case 3:
    //       doctor_review = "Not satisfied with this doctor's services";
    //       clinic_review = "Not satisfied with this clinic's services";
    //       break;
    //     case 4:
    //       doctor_review = "Below average experience with this doctor";
    //       clinic_review = "Below average experience with this clinic";
    //       break;
    //     case 5:
    //       doctor_review = "Average experience with this doctor";
    //       clinic_review = "Average experience with this clinic";
    //       break;
    //     case 6:
    //       doctor_review = "Satisfied with this doctor's services";
    //       clinic_review = "Satisfied with this clinic's services";
    //       break;
    //     case 7:
    //       doctor_review = "Good experience with this doctor";
    //       clinic_review = "Good experience with this clinic";
    //       break;
    //     case 8:
    //       doctor_review = "Very good experience with this doctor";
    //       clinic_review = "Very good experience with this clinic";
    //       break;
    //     case 9:
    //       doctor_review = "Excellent experience with this doctor";
    //       clinic_review = "Excellent experience with this clinic";
    //       break;
    //     case 10:
    //       doctor_review = "Outstanding experience with this doctor";
    //       clinic_review = "Outstanding experience with this clinic";
    //       break;
    //     default: break
    //   }
    //
    //   const existingReview = reviews.find(review => review.userId === userId && review.doctorId === doctorId && review.clinicId === clinicId);
    //
    //   if (!existingReview) {
    //     reviews.push({
    //       userId,
    //       doctor_review,
    //       clinic_review,
    //       doctorId,
    //       clinicId,
    //       createdAt: new Date(),
    //       updatedAt: new Date()
    //     });
    //   }
    // }
    //
    //  await queryInterface.bulkInsert('Reviews', reviews, {});

  },

  async down (queryInterface, Sequelize) {


     // await queryInterface.bulkDelete('Reviews', null, {});

  }
};
