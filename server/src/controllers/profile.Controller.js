const {Shedule, Doctor, Clinic, Address, Speciality, Rating, Slot, User} = require("../../db/models");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { sendMail } = require("../nodeMailer");

const jwtSecret = process.env.JWT_SECRET

exports.GetProfileArrays = async (req, res) => {
    try {
        const {userId} = req.params;

        const visitsDone = await Shedule.findAll({   //* проверяем прошедшие визиты
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


        if (!resultArrayDone.length && !resultArrayPending.length) {
            res.json({
                messageDone: 'Вы ещё не посещали врачей этого портала',
                messagePending: 'Нет запланированных приёмов к врачу'
            });
        }

        if (!resultArrayDone.length && resultArrayPending.length) {
            res.json({messageDone: 'Вы ещё не посещали врачей этого портала', resultArrayPending});
        }
        if (!resultArrayPending.length && resultArrayDone.length) {
            res.json({messagePending: 'Нет запланированных приёмов к врачу', resultArrayDone})
        }

        if (resultArrayPending.length && resultArrayDone.length) {
            res.json({resultArrayDone, resultArrayPending})
        }
    } catch
        (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
}

exports.EditRecordsInProfile = async (req, res) => {

    try {
        const {scheduleId, clinicRating, doctorRating, newdate, newslotid, userId, clinicId, doctorId} = req.body;

        //* апдейтим рейтинг определенного врача или клиники, за которые когда-то голосовал юзер

        if (clinicRating && clinicId) {
            const [numUpdated, updatedRating] = await Rating.update(
                {
                    clinicRating
                },
                {
                    where: {userId: res?.locals?.user?.id, clinicId},
                    returning: true
                }
            );
            if (numUpdated === 0) {
                return res.status(404).json({message: 'Clinic\'s rating not found'});
            }
            res.status(200).json({rating: updatedRating});
        }

        if (doctorRating && doctorId) { //* обновляем рейтинг докторов и клиник
            const [numUpdated, updatedRating] = await Rating.update(
                {
                    doctorRating

                },
                {
                    where: {userId, doctorId},
                    returning: true
                }
            );
            if (numUpdated === 0) {
                return res.status(404).json({message: 'Doctor\'s rating not found'});
            }
            res.status(200).json({rating: updatedRating});
        }


        //* обновляем расписание юзера
        if ((newdate || newslotid) && scheduleId) {

            const [numUpdated, [updatedSchedule]] = await Shedule.update(
                {
                    date: newdate,
                    slotId: newslotid
                },
                {
                    where: {id: scheduleId, userId},
                    returning: true
                }
            );

            if (numUpdated === 0) {
                return res.status(404).json({message: 'Schedule not found'});
            }
            res.status(200).json({schedule: updatedSchedule});
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

exports.DeleteRecordsFromProfile = async (req, res) => {
    try {
        const {scheduleId, userId} = req.body;

        //* удаляем запись из расписания (как один из прошедших приёмов, так и будущие)

        if (scheduleId) {
            const deletedShedule = await Shedule.destroy(
                {
                    where: {id: scheduleId, userId},
                }
            );

            if (deletedShedule === 0) {
                return res.status(404).json({message: 'Error while deleting'});
            }
            res.status(200).json({message: 'Deleting was successful'});
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

exports.EditProfile = async (req, res) => {
    try {
        const {
            id,
            firstName,
            lastName,
            email,
            telephone,
            newPassword,
            oldPassword,
        } = req.body;



        if (newPassword && newPassword.length < 3) {
            return res
                .status(400)
                .send({ message: 'Password must be at least 3 characters long' });
        }
        if (!/^[A-Z0-9a-z._%+-]+@[A-Z0-9a-z.-]+\.[A-Za-z]{2,}$/.test(email) && email) {
            return res.status(400).send({ message: 'Invalid email address' });
        }

        const regexName = /^[a-zA-Z]+(\s+[a-zA-Z]+)*$/;
        if (!regexName.test(firstName) || !regexName.test(lastName)) {
            return res.status(409).json({message: "Name could consist only of words."});
        }

        const regexTel = /^[0-9+-]+$/;
        if (!regexTel.test(telephone) && telephone) {
            return res.status(409).json({message: "Phone number consists of numbers (123), plus sign (+) and minus sign (-)."});
        }

        const user = await User.findOne({where: {id}});
        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) {
            return res.status(401).json({message: 'Please, enter correct password'});
        }

        const updateData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            telephone: telephone,
        };

        if (newPassword) {
            const saltRounds = 10;
            updateData.password = await bcrypt.hash(newPassword, saltRounds);
        }

        const [nmbOfUpdatedRows, [updatedUser]] = await User.update(updateData,
            {
                where: {
                    id,
                },
                returning: true,
            });

        if (nmbOfUpdatedRows === 0) {
            return res.status(404).json({message: 'Error while updating user'});
        }

        delete updatedUser.dataValues.password;
        // sendMail('slavpolichev@gmail.com', 'Information update', 'You have sucsessfuly updated Your profile information!');
        res.status(200).json({user: updatedUser, message: 'You have successfully edited your profile!'})


    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Internal server error'})
    }
};
