'use strict';
const hoaxer = require('hoaxer');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {


        const hoaxer = require("hoaxer");
        const doctorIds = Array.from({length: 20}, (_, i) => i + 1);
        const clinicIds = Array.from({length: 10}, (_, i) => i + 1);

        const ratings = [];
        const reviews = [];

        for (let userId = 1; userId <= 5; userId++) {
            for (let doctorId of doctorIds) {
                const doctorRating = hoaxer.datatype.number({min: 1, max: 5});
                const doctor_review = getReview(doctorRating);
                let date;
                date = hoaxer.date.between('2020-01-01', '2023-03-20');

                ratings.push({
                    userId,
                    doctorRating,
                    clinicRating: null,
                    doctorId,
                    clinicId: null,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });

                reviews.push({
                    date: date.toISOString().slice(0, 10),
                    userId,
                    doctor_review,
                    clinic_review: null,
                    doctorId,
                    clinicId: null,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }


            for (let clinicId of clinicIds) {
                const clinicRating = hoaxer.datatype.number({min: 1, max: 5});
                const clinic_review = getReview(clinicRating);
                let date;
                date = hoaxer.date.between('2020-01-01', '2023-03-20');

                ratings.push({
                    userId,
                    doctorRating: null,
                    clinicRating,
                    doctorId: null,
                    clinicId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });

                reviews.push({
                    date: date.toISOString().slice(0, 10),
                    userId,
                    doctor_review: null,
                    clinic_review,
                    doctorId: null,
                    clinicId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }
        }

        for (let userId = 6; userId <= 10; userId++) {
            for (let doctorId of doctorIds) {
                const doctorRating = hoaxer.datatype.number({min: 5, max: 5});
                const doctor_review = getReview(doctorRating);
                let date;
                date = hoaxer.date.between('2020-01-01', '2023-03-20');

                ratings.push({
                    userId,
                    doctorRating,
                    clinicRating: null,
                    doctorId,
                    clinicId: null,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });

                reviews.push({
                    date: date.toISOString().slice(0, 10),
                    userId,
                    doctor_review,
                    clinic_review: null,
                    doctorId,
                    clinicId: null,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }


            for (let clinicId of clinicIds) {
                const clinicRating = hoaxer.datatype.number({min: 5, max: 5});
                const clinic_review = getReview(clinicRating);
                let date;
                date = hoaxer.date.between('2020-01-01', '2023-03-20');

                ratings.push({
                    userId,
                    doctorRating: null,
                    clinicRating,
                    doctorId: null,
                    clinicId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });

                reviews.push({
                    date: date.toISOString().slice(0, 10),
                    userId,
                    doctor_review: null,
                    clinic_review,
                    doctorId: null,
                    clinicId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }
        }

        function getReview(rating) {
            switch (rating) {
                case 1:
                    return "Terrible experience";
                case 2:
                    return "Very disappointing visit";
                case 3:
                    return "Not satisfied with the services";
                case 4:
                    return "Good experience";
                case 5:
                    return "Excellent experience";
                default:
                    return null;
            }
        }

        await queryInterface.bulkInsert('Ratings', ratings, {});
        await queryInterface.bulkInsert('Reviews', reviews, {});

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
