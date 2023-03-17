const {Doctor, Clinic, Address, Shedule, Speciality, Slot, Rating} = require("../../db/models");
const {Op} = require("sequelize");


exports.DoctorsFromSearch = async (req, res) => {
    try {
        const {adultPatients, childrenPatients, specialityName, countryName, cityName, streetName} = req.body
        let whereClause = {};

        if (adultPatients && !childrenPatients) {
            whereClause = {adultPatients: true, childrenPatients: false};
        }
        if (!adultPatients && childrenPatients) {
            whereClause = {childrenPatients: true, adultPatients: false};
        }
        if (adultPatients && childrenPatients) {
            whereClause = {
                [Op.and]: [
                    {adultPatients: true},
                    {childrenPatients: true}
                ]
            };
        }
        const doctors = await Doctor.findAll({
            where: whereClause,
            include: [
                {
                    model: Clinic,
                    include: [
                        {model: Address, where: {countryName, cityName, streetName}}
                    ]
                },
                {
                    model: Speciality, where: {name: specialityName}
                },
            ],
            raw: true,
            nest: true
        });

        const doctorRating = await Rating.findAll({attributes: ['doctorRating', 'doctorId']})

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

        const readyDoctorList = doctors.map(
            doctor => {
                const fullname = `${doctor.firstName} ${doctor.lastName}`
                const fulladdress = `${doctor.Clinic.Address.countryName}, ${doctor.Clinic.Address.cityName}, ${doctor.Clinic.Address.streetName}`
                let docRate;
                arrDoc.forEach(el => {
                    if (Number(el[0]) === doctor.id) {
                        docRate = el[1]
                    }
                })
                return {
                    doctorId: doctor.id,
                    name: fullname,
                    phone: doctor.phone,
                    address: fulladdress,
                    speciality: doctor.Speciality.name,
                    clinic: doctor.Clinic.name,
                    email: doctor.email,
                    generalTiming: doctor.generalTiming,
                    adultPatients: doctor.adultPatients,
                    childrenPatients: doctor.childrenPatients,
                    generalInfo: doctor.generalInfo,
                    doctorRating: docRate,
                    avatar: doctor.avatar
                }
            }
        )

        if (readyDoctorList.length) {
            res.json(readyDoctorList)
        } else res.json({message: 'Nothing to show!'});

    } catch (e) {
        console.error(e)
    }

}

exports.ExactDoctor = async (req, res) => {
    try {
        const {doctorId} = req.params;
        const doctor = await Doctor.findOne({where: {id: doctorId}})

        const responseRating = await Rating.findAll({where: {doctorId}})


        const doctorRating = responseRating.reduce((acc, val) => {
            acc += val.doctorRating;
            return acc
        }, 0)
        const averageDocRating = (doctorRating / responseRating.length).toLocaleString('en-US', {maximumFractionDigits: 1})
        const readyDoc = [doctor].map((el) => {
            return {
                id: el.id,
                firstName: el.firstName,
                lastName: el.lastName,
                email: el.email,
                phone: el.phone,
                specialityId: el.specialityId,
                clinicId: el.clinicId,
                generalTiming: el.generalTiming,
                adultPatients: el.adultPatients,
                childrenPatients: el.childrenPatients,
                generalInfo: el.generalInfo,
                averageDocRating,
                avatar: el.avatar
            }
        })
        const shedulesAdUser = await Shedule.findAll({
            where: {userId: res.locals.user.id, doctorId},
            include: [{model: Slot}]
        })

        const shedulesDoctor = await Shedule.findAll({
            where: {
                doctorId,
                statusAppointment: {
                    [Op.or]: ['vacant', 'pending'],
                },
            },
            include: [{ model: Slot }],
        })

        const readyUserOwnShedule = shedulesAdUser.map((record) => {
            return {
                date: record.date,
                time: record.Slot.timeGap,
                status: record.statusAppointment,
                userId: record.userId,
                sheduleId: record.id
            }
        })

        const doctorShedule = shedulesDoctor.map((record) => {
            return {
                date: record.date,
                time: record.Slot.timeGap,
                status: record.statusAppointment,
                userId: record.userId,
                sheduleId: record.id
            }
        })

        if (doctor.id) {
            res.json({readyDoc, readyUserOwnShedule, doctorShedule})
        } else res.json({message: "Couldn't find doctor"})
    } catch (e) {
        console.error(e)
    }
};
