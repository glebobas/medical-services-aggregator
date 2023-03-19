const {Doctor, Clinic, Address, Shedule, Speciality, Slot, Rating} = require("../../db/models");
const {Op} = require("sequelize");


exports.DoctorsFromSearch = async (req, res) => {
    try {
        const {adultPatients, childrenPatients, specialityName, countryName, cityName, streetName} = req.body

        if (!((adultPatients || childrenPatients) || specialityName || countryName || cityName || streetName)) {
            return res.json({message: 'You should fill more then 1 field!'})
        }

        let whereClause = {};

        if (adultPatients === 'true' && childrenPatients === 'false') {
            whereClause = {adultPatients: true};
        }
        if (adultPatients === 'false' && childrenPatients === 'true') {
            whereClause = {childrenPatients: true};
        }
        if (adultPatients === 'true' && childrenPatients === 'true') {
            whereClause = {
                [Op.and]: [
                    {adultPatients: true},
                    {childrenPatients: true}
                ]
            };
        }

        if (adultPatients === 'false' && childrenPatients === 'false') {
            whereClause = {};
        }


        const specialityWhereClause = specialityName
            ? { name: specialityName }
            : {};

        let addressWhereClause;

        if (countryName && !cityName) {

            addressWhereClause = {
                countryName: countryName
            }
            // console.log("-> addressWhereClause", addressWhereClause);
        }

        if (!countryName && cityName) {
            addressWhereClause = {
                cityName
            }
        }

        if (countryName && cityName) {
            addressWhereClause = {
                cityName,
                countryName
            }
        }



        const doctors = await Doctor.findAll({
            where: whereClause,
            include: [
                {
                    model: Clinic,
                    include: [
                        { model: Address, where: addressWhereClause, required: true,
                        },
                    ],
                    required: true,
                },
                { model: Speciality, where: specialityWhereClause },
            ],
            raw: true,
            nest: true,
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

        let readyDoctorList;

        if (res?.locals?.user?.id) {

            const ratingToUser = await Rating.findAll({where: {userId: res.locals.user.id}})

             readyDoctorList = doctors.map(
                doctor => {
                    const fullname = `${doctor.firstName} ${doctor.lastName}`
                    const fulladdress = `${doctor.Clinic.Address.countryName}, ${doctor.Clinic.Address.cityName}, ${doctor.Clinic.Address.streetName}`
                    let docRate;
                    arrDoc.forEach(el => {
                        if (Number(el[0]) === doctor.id) {
                            docRate = el[1]
                        }
                    })
                    let ownRatingUserDoc;
                    ratingToUser?.forEach(element => {
                        if (element.userId === res.locals.user.id && doctor.id === element.doctorId) {
                            ownRatingUserDoc = element.doctorRating
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
                        avatar: doctor.avatar,
                        alreadyScoredPoints: ownRatingUserDoc,
                    }
                }
            )


        }

        if (!res?.locals?.user?.id) {

            readyDoctorList = doctors.map(
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
                        avatar: doctor.avatar,
                    }
                }
            )

        }

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

        const doctor = await Doctor.findOne({where: {id: doctorId}, include: [
                {
                    model: Clinic,
                    include: [
                        {model: Address}
                    ]
                },
                {
                    model: Speciality,
                },
            ],})


        const responseRating = await Rating.findAll({where: {doctorId}})




        const doctorRating = responseRating.reduce((acc, val) => {
            acc += val.doctorRating;
            return acc
        }, 0)
        const averageDocRating = (doctorRating / responseRating.length).toLocaleString('en-US', {maximumFractionDigits: 1})
        let readyDoc;
        let readyUserOwnShedule = [];

        if (res?.locals?.user?.id) {

            const ratingToUser = await Rating.findAll({where: {userId: res.locals.user.id}})

            readyDoc = [doctor].map((el) => {
                const fulladdress = `${doctor.Clinic.Address.countryName}, ${doctor.Clinic.Address.cityName}, ${doctor.Clinic.Address.streetName}`
                let ownRatingUser;
                ratingToUser?.forEach(element => {
                    if (element.userId === res.locals.user.id && el.id === element.doctorId) {
                        ownRatingUser = element.doctorRating
                    }
                })
                return {
                    id: el.id,
                    firstName: el.firstName,
                    lastName: el.lastName,
                    speciality: doctor.Speciality.name,
                    address: fulladdress,
                    email: el.email,
                    phone: el.phone,
                    specialityId: el.specialityId,
                    clinicId: el.clinicId,
                    generalTiming: el.generalTiming,
                    adultPatients: el.adultPatients,
                    childrenPatients: el.childrenPatients,
                    generalInfo: el.generalInfo,
                    averageDocRating,
                    alreadyScoredPoints: ownRatingUser,
                    avatar: el.avatar
                }
            })

            const shedulesAdUser = await Shedule.findAll({
                where: {userId: res.locals.user.id, doctorId},
                include: [{model: Slot}]
            })

            readyUserOwnShedule = shedulesAdUser.map((record) => {
                return {
                    date: record.date,
                    time: record.Slot.timeGap,
                    status: record.statusAppointment,
                    userId: record.userId,
                    sheduleId: record.id
                }
            })

        }
        if (!res?.locals?.user?.id) {
            readyDoc = [doctor].map((el) => {
                return {
                    id: el.id,
                    name: el.firstName + ' ' + el.lastName,
                    email: el.email,
                    phone: el.phone,
                    specialityId: el.specialityId,
                    speciality: el.Speciality.name,
                    clinic: el.Clinic.name,
                    clinicId: el.clinicId,
                    generalTiming: el.generalTiming,
                    adultPatients: el.adultPatients,
                    childrenPatients: el.childrenPatients,
                    generalInfo: el.generalInfo,
                    averageDocRating,
                    avatar: el.avatar
                }
            })
        }


        const shedulesDoctor = await Shedule.findAll({
            where: {
                doctorId,
                statusAppointment: {
                    [Op.or]: ['vacant', 'pending'],
                },
            },
            include: [{ model: Slot }],
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

        if (doctor.id && !readyUserOwnShedule.length) {
            res.json({readyDoc, doctorShedule})
        }
        if (doctor.id && readyUserOwnShedule.length) {
            res.json({readyDoc, readyUserOwnShedule, doctorShedule})
        }
        if (!doctor.id) res.json({message: "Couldn't find doctor"})
    } catch (e) {
        console.error(e)
    }
};
