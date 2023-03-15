const express = require('express');
const authenticate = require("../middleware/auth");
const router = express.Router();

const {Shedule, Doctor, Clinic, Slot, User, Address, Speciality, Rating} = require('../../db/models')

// const jwtSecret = process.env.JWT_SECRET

router.get('/:userId', authenticate, async (req, res) => {
    try {
        const {userId} = req.params;

        const visitsDone = await Shedule.findAll({
            where: {userId, statusAppointment: 'done'},
            include: [
                {
                    model: Doctor,
                    include: [
                        {model: Clinic, include: [{model: Address}]}, {model: Speciality}, {model: Rating}
                    ]
                },
                {
                    model: Slot,
                },
                {
                    model: User,
                },
            ],
            raw: true,
            nest: true
        });

        const visitsPending = await Shedule.findAll({
            where: {userId, statusAppointment: 'pending'},
            include: [
                {
                    model: Doctor,
                    include: [
                        {model: Clinic, include: [{model: Address}]}, {model: Speciality},
                    ]
                },
                {
                    model: Slot,
                },
                {
                    model: User,
                },
            ],
            raw: true,
            nest: true
        });
        const doctorRating = await Rating.findAll({attributes: ['doctorRating', 'doctorId']})
        const clinicRating = await Rating.findAll({attributes: ['clinicRating', 'clinicId']})

        const clinicRatings = {};
        clinicRating.forEach(rating => {

            if (clinicRatings[rating.clinicId]) {
                clinicRatings[rating.clinicId].total += rating.clinicRating;
                clinicRatings[rating.clinicId].count += 1;
            } else {
                clinicRatings[rating.clinicId] = {
                    total: rating.clinicRating,
                    count: 1
                };
            }
        });

        const clinicRatingAverages = {};

        for (const [id, rating] of Object.entries(clinicRatings)) {
            clinicRatingAverages[id] = (rating.total / rating.count).toLocaleString('en-US', {maximumFractionDigits: 1});
        }

        const doctorRatings = {};
        doctorRating.forEach(rating => {

            if (doctorRatings[rating.doctorId]) {
                doctorRatings[rating.doctorId].total += rating.doctorRating;
                doctorRatings[rating.doctorId].count += 1;
            } else {
                doctorRatings[rating.doctorId] = {
                    total: rating.doctorRating,
                    count: 1
                };
            }
        });

        const doctorRatingAverages = {};

        for (const [id, rating] of Object.entries(doctorRatings)) {
            doctorRatingAverages[id] = (rating.total / rating.count).toLocaleString('en-US', {maximumFractionDigits: 1});
        }

        const arrDoc = Object.entries(doctorRatingAverages)
        const arrClinic = Object.entries(clinicRatingAverages)

        const resultArrayPending = visitsPending?.map(appointment => {
            const fullname = `${appointment.Doctor.firstName} ${appointment.Doctor.lastName}`
            const fulladdress = `${appointment.Doctor.Clinic.Address.streetName}, ${appointment.Doctor.Clinic.Address.cityName}, ${appointment.Doctor.Clinic.Address.countryName}`;
            let docRate;
            let clinicRate;
            arrDoc.forEach(el => {
                if (Number(el[0]) === appointment.doctorId) {
                    docRate = el[1]
                }
            })
            arrClinic.forEach(el => {
                if (Number(el[0]) === appointment.Doctor.clinicId) {
                    clinicRate = el[1]
                }
            })
            return {
                sheduleid: appointment.id,
                userid: appointment.userId,
                date: appointment.date,
                timeGap: appointment.Slot.timeGap,
                doctorSpeciality: appointment.Doctor.Speciality.name,
                doctorFullName: fullname,
                clinicName: appointment.Doctor.Clinic.name,
                clinicAddress: fulladdress,
                clinicPhone: appointment.Doctor.Clinic.phone,
                doctorRating: docRate,
                clinicRating: clinicRate,
            }


        })


        const resultArrayDone = visitsDone?.map(appointment => {
                const fullname = `${appointment.Doctor.firstName} ${appointment.Doctor.lastName}`
                const fulladdress = `${appointment.Doctor.Clinic.Address.streetName}, ${appointment.Doctor.Clinic.Address.cityName}, ${appointment.Doctor.Clinic.Address.countryName}`
            let docRate;
            let clinicRate;
            arrDoc.forEach(el => {
                    if (Number(el[0]) === appointment.doctorId) {
                        docRate = el[1]
                    }
                })
            arrClinic.forEach(el => {
                if (Number(el[0]) === appointment.Doctor.clinicId) {
                    clinicRate = el[1]
                }
            })
                return {
                    sheduleid: appointment.id,
                    userid: appointment.userId,
                    date: appointment.date,
                    timeGap: appointment.Slot.timeGap,
                    doctorSpeciality: appointment.Doctor.Speciality.name,
                    doctorFullName: fullname,
                    clinicName: appointment.Doctor.Clinic.name,
                    clinicAddress: fulladdress,
                    clinicPhone: appointment.Doctor.Clinic.phone,
                    doctorRating: docRate,
                    clinicRating: clinicRate,

                }
            }
        );


        if(!resultArrayDone.length && !resultArrayPending.length) {
            res.json({messageDone:'Вы ещё не посещали врачей этого портала', messagePending:'Нет запланированных приёмов к врачу'});
        }

        if(!resultArrayDone.length && resultArrayPending.length) {
            res.json({messageDone:'Вы ещё не посещали врачей этого портала', resultArrayPending});
        }
        if(!resultArrayPending.length && resultArrayDone.length) {
            res.json({messagePending:'Нет запланированных приёмов к врачу', resultArrayDone})
        }

        if(resultArrayPending.length && resultArrayDone.length) {
            res.json({resultArrayDone, resultArrayPending})
        }
    } catch
        (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
})
;


module.exports = router;
