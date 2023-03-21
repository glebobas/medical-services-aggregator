'use strict';
const hoaxer = require('hoaxer');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hoaxer = require("hoaxer");
    const doctorIds = Array.from({length: 20}, (_, i) => i + 1);
    const clinicIds = Array.from({length: 10}, (_, i) => i + 1);

    const ratings = [];
    const reviews = []


    for (let i = 1; i <= 5000; i++) {
      const userId = hoaxer.datatype.number({min: 1, max: 10});
      let doctorRating = hoaxer.datatype.number({min: 1, max: 5});
      let clinicRating = hoaxer.datatype.number({min: 1, max: 5});
      let doctorId = hoaxer.random.arrayElement(doctorIds.concat([null]));
      let clinicId = hoaxer.random.arrayElement(clinicIds.concat([null]));


      if (doctorId === null) {
        doctorRating = null;
      }


      if (clinicId === null) {
        clinicRating = null;
      }

      // const existingRating = ratings.find(rating => rating.userId === userId && rating.doctorId === doctorId && rating.clinicId === clinicId);


      // if (!existingRating) {
        ratings.push({
          userId,
          doctorRating,
          clinicRating,
          doctorId,
          clinicId,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      // }

      let doctor_review = null;
      let clinic_review = null;

      if (doctorId === null) {
        doctor_review = null;
      }


      if (clinicId === null) {
        clinic_review = null;
      }

      switch (doctorRating) {
        case 1:
          doctor_review = "Terrible experience with this doctor";
          break;
        case 2:
          doctor_review = "Very disappointing visit with this doctor";
          break;
        case 3:
          doctor_review = "Not satisfied with this doctor's services";
          break;
        case 4:
          doctor_review = "Good experience with this doctor";
          break;
        case 5:
          doctor_review = "Excellent experience with this doctor";
          break;
        default:
          break
      }

      switch (clinicRating) {
        case 1:
          clinic_review = "Terrible experience with this clinic";
          break;
        case 2:
          clinic_review = "Very disappointing visit with this clinic";
          break;
        case 3:
          clinic_review = "Not satisfied with this clinic's services";
          break;
        case 4:
          clinic_review = "Good experience with this clinic";
          break;
        case 5:
          clinic_review = "Outstanding experience with this clinic";
          break;
        default:
          break
      }

      // const existingReview = reviews.find(review => (review.userId === userId && review.doctorId === doctorId) || (review.userId && review.clinicId === clinicId));

      // if (!existingReview) {
      reviews.push({
        userId,
        doctor_review,
        clinic_review,
        doctorId,
        clinicId,
        createdAt: new Date(),
        updatedAt: new Date()
      });
   // }
    }



//* наваливаем норм отзывов и рейтинга для повышения среднего балла

    for (let i = 1; i <= 500; i++) {
      const userId = hoaxer.datatype.number({min: 1, max: 10});
      let doctorRating = hoaxer.datatype.number({min: 5, max: 5});
      let clinicRating = hoaxer.datatype.number({min: 5, max: 5});
      let doctorId = hoaxer.random.arrayElement(doctorIds.concat([null]));
      let clinicId = hoaxer.random.arrayElement(clinicIds.concat([null]));


      if (doctorId === null) {
        doctorRating = null;
      }


      if (clinicId === null) {
        clinicRating = null;
      }

      // const existingRating = ratings.find(rating => (rating.userId === userId && rating.doctorId === doctorId) || (rating.userId && rating.clinicId === clinicId));

      // if (!existingRating) {
        ratings.push({
          userId,
          doctorRating,
          clinicRating,
          doctorId,
          clinicId,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      // }

      let doctor_review = null;
      let clinic_review = null;

      if (doctorId === null) {
        doctor_review = null;
      }


      if (clinicId === null) {
        clinic_review = null;
      }

      switch (doctorRating) {
        case 3:
          doctor_review = "Not satisfied with this doctor's services";
          break;
        case 4:
          doctor_review = "Good experience with this doctor";
          break;
        case 5:
          doctor_review = "Excellent experience with this doctor";
          break;
        default:
          break
      }

      switch (clinicRating) {

        case 3:
          clinic_review = "Not satisfied with this clinic's services";
          break;
        case 4:
          clinic_review = "Good experience with this clinic";
          break;
        case 5:
          clinic_review = "Outstanding experience with this clinic";
          break;
        default:
          break
      }

      // const existingReview = reviews.find(review => (review.userId === userId && review.doctorId === doctorId) || (review.userId && review.clinicId === clinicId));

      // if (!existingReview) {
        reviews.push({
          userId,
          doctor_review,
          clinic_review,
          doctorId,
          clinicId,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      //}

    }

    const uniqueRatings = ratings.reduce((acc, rating) => {
      const existingRatingIndex = acc.findIndex(
          (r) =>
              r.userId === rating.userId &&
              ((r.doctorId === rating.doctorId) ||
                  (r.clinicId === rating.clinicId))
      );

      if (existingRatingIndex === -1) {
        acc.push(rating);
      }
      if (existingRatingIndex !== -1) {
        acc[existingRatingIndex] = rating;
      }

      return acc;
    }, []);

    const uniqueReviews = reviews.reduce((acc, review) => {
      const existingReviewIndex = acc.findIndex(
          (r) =>
              r.userId === review.userId &&
              ((r.doctorId === review.doctorId) ||
                  (r.clinicId === review.clinicId))
      );

      if (existingReviewIndex === -1) {
        acc.push(review);
      }
      // else {
      //   acc[existingReviewIndex] = review;
      // }

      return acc;
    }, []);

    await queryInterface.bulkInsert('Ratings', uniqueRatings, {});
    await queryInterface.bulkInsert('Reviews', uniqueReviews, {});

  },


  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Ratings', null, {});

  }
}
//
//
//
//
//
//




//
// const hasDuplicate = uniqueRatings.filter((rating, index, self) => {
//   return (
//       self.findIndex(
//           (r) =>
//               r.userId === rating.userId &&
//               ((r.doctorId === rating.doctorId && rating.doctorId !== null) ||
//                   (r.clinicId === rating.clinicId && rating.clinicId !== null))
//       ) !== index
//   );
// }).length > 0;
//
// if (hasDuplicate) {
//   console.log("There are duplicates in the ratings array");
// } else {
//   console.log("There are no duplicates in the ratings array");
// }
