const {Doctor, Clinic, Address, Speciality, Rating, Slot, Shedule} = require("../../db/models");
const {Op} = require("sequelize");
const express = require('express');
const jwt = require("jsonwebtoken");
const app = express();
const dayjs = require('dayjs')


const jwtSecret = process.env.JWT_SECRET

exports.GetAllClinicAndDoctors = async (req, res) => { //* ПО ИНПУТУ получаем все клиники и докторов с подробной инфой и рейтингами

    try {
        const {inputText} = req.params


        const doctors = await Doctor.findAll({
            where: {
                [Op.or]: [
                    {
                        [Op.and]: [
                            {
                                firstName: {
                                    [Op.iLike]: `%${inputText.split(' ')[0]}%`
                                }
                            },
                            {
                                lastName: {
                                    [Op.iLike]: `%${inputText.split(' ')[1]}%`
                                }
                            }
                        ]
                    },
                    {
                        [Op.or]: [
                            {
                                firstName: {
                                    [Op.iLike]: `%${inputText}%`
                                }
                            },
                            {
                                lastName: {
                                    [Op.iLike]: `%${inputText}%`
                                }
                            }
                        ]
                    }
                ]
            },
            include: [
                {
                    model: Clinic,
                    include: [
                        {model: Address}
                    ]
                },
                {
                    model: Speciality,
                },
            ],
            raw: true,
            nest: true
        });

        const clinics = await Clinic.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${inputText}%`
                }
            },
            include: [
                {
                    model: Address,
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

        let readyClinicList;
        let readyDoctorList;

        // console.log("-> res.locals.user.id", res.locals);

        if (res?.locals?.user?.id) {

            const ratingToUser = await Rating.findAll({where: {userId: res.locals.user.id}})

            readyClinicList = clinics.map(clinic => {
                const fulladdress = `${clinic.Address.streetName}, ${clinic.Address.cityName}, ${clinic.Address.countryName}`;
                let clinicRate;
                let ownRatingUser;
                ratingToUser?.forEach(element => {
                    if (element.userId === res.locals.user.id && clinic.id === element.clinicId) {
                        ownRatingUser = element.clinicRating
                    }
                })
                arrClinic?.forEach(el => {
                    if (Number(el[0]) === clinic.id) {
                        clinicRate = el[1]
                    }
                })
                return {
                    clinicId: clinic.id,
                    name: clinic.name,
                    phone: clinic.phone,
                    address: fulladdress,
                    email: clinic.email,
                    generalinfo: clinic.generalnfo,
                    clinicRating: clinicRate,
                    alreadyScoredPoints: ownRatingUser,
                    avatar: clinic.avatar
                }
            })

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
                        alreadyScoredPoints: ownRatingUserDoc,
                        avatar: doctor.avatar,
                    }
                }
            )

        }

        if (!res?.locals?.user?.id) {


            readyClinicList = clinics.map(clinic => {
                const fulladdress = `${clinic.Address.streetName}, ${clinic.Address.cityName}, ${clinic.Address.countryName}`;
                let clinicRate;


                arrClinic?.forEach(el => {
                    if (Number(el[0]) === clinic.id) {
                        clinicRate = el[1]
                    }
                })
                return {
                    clinicId: clinic.id,
                    name: clinic.name,
                    phone: clinic.phone,
                    address: fulladdress,
                    email: clinic.email,
                    generalinfo: clinic.generalnfo,
                    clinicRating: clinicRate,
                    avatar: clinic.avatar
                }
            })

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

        if (!readyClinicList.length && !readyDoctorList.length) {
            return res.status(409).json({message: "No clinics and doctors were found!"});
        }


        res.json({readyClinicList, readyDoctorList})


    } catch
        (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
}
;

exports.GetAllClinicAndDoctorsQuery = async (req, res) => { //* получаем все клиники и докторов с подробной инфой и рейтингами

    try {
        const doctors = await Doctor.findAll({
            include: [
                {
                    model: Clinic,
                    include: [
                        {model: Address}
                    ]
                },
                {
                    model: Speciality,
                },
            ],
            raw: true,
            nest: true
        });


        const clinics = await Clinic.findAll({
            include: [
                {
                    model: Address,
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


        let readyClinicList;
        let readyDoctorList;

        // console.log("-> res.locals.user.id", res.locals);

        if (res?.locals?.user?.id) {

            const ratingToUser = await Rating.findAll({where: {userId: res.locals.user.id}})

            readyClinicList = clinics.map(clinic => {
                const fulladdress = `${clinic.Address.streetName}, ${clinic.Address.cityName}, ${clinic.Address.countryName}`;
                let clinicRate;
                let ownRatingUser;
                ratingToUser?.forEach(element => {
                    if (element.userId === res.locals.user.id && clinic.id === element.clinicId) {
                        ownRatingUser = element.clinicRating
                    }
                })
                arrClinic?.forEach(el => {
                    if (Number(el[0]) === clinic.id) {
                        clinicRate = el[1]
                    }
                })
                return {
                    clinicId: clinic.id,
                    name: clinic.name,
                    phone: clinic.phone,
                    address: fulladdress,
                    email: clinic.email,
                    generalinfo: clinic.generalnfo,
                    clinicRating: clinicRate,
                    alreadyScoredPoints: ownRatingUser,
                    avatar: clinic.avatar
                }
            })

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
                        alreadyScoredPoints: ownRatingUserDoc,
                        avatar: doctor.avatar,
                    }
                }
            )

        }

        if (!res?.locals?.user?.id) {


            readyClinicList = clinics.map(clinic => {
                const fulladdress = `${clinic.Address.streetName}, ${clinic.Address.cityName}, ${clinic.Address.countryName}`;
                let clinicRate;


                arrClinic?.forEach(el => {
                    if (Number(el[0]) === clinic.id) {
                        clinicRate = el[1]
                    }
                })
                return {
                    clinicId: clinic.id,
                    name: clinic.name,
                    phone: clinic.phone,
                    address: fulladdress,
                    email: clinic.email,
                    generalinfo: clinic.generalnfo,
                    clinicRating: clinicRate,
                    avatar: clinic.avatar
                }
            })

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

        if (!readyClinicList.length && !readyDoctorList.length) {
            return res.status(409).json({message: "No clinics and doctors were found!"});
        }


        res.json({readyClinicList, readyDoctorList})


    } catch
        (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
}
;


exports.GetAllSpecialities = async (req, res) => {
    try {
        const allSpecialities = await Speciality.findAll();
        res.json(allSpecialities)
    } catch (e) {
        console.error(e);
    }

}

exports.GetAllAddresses = async (req, res) => {
    try {
        const allAddresses = await Address.findAll();
        res.json(allAddresses)
    } catch (e) {
        console.error(e);
    }
}

exports.GetInfoAboutSlot = async (req, res) => {
    const {sheduleId} = req.params
    try {
        const slot = await Shedule.findOne({
            where: {id: sheduleId},
            include: [{model: Slot}, {
                model: Doctor,
                include: [{model: Speciality}, {model: Clinic, include: [{model: Address}]}]
            }]
        })
        const readySlot = [slot].map(slot => {
            return {
                date: slot.date,
                time: slot.Slot.timeGap,
                id: slot.id,
                status: slot.statusAppointment,
                doctorName: `${slot.Doctor.firstName} ${slot.Doctor.lastName}`,
                speciality: slot.Doctor.Speciality.name,
                clinicName: slot.Doctor.Clinic.name,
                address: `${slot.Doctor.Clinic.Address.streetName}, ${slot.Doctor.Clinic.Address.cityName}, ${slot.Doctor.Clinic.Address.countryName}`
            }
        })
        if (slot.id) {
            return res.json({readySlot})
        }
        if (!slot.id) {
            return res.status(409).json({message: "No data found!"});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
}


exports.NewEntry = async (req, res) => {
    const {sheduleId, statusAppointment} = req.body

    const userId = res?.locals?.user?.id


    try {

        const [nmbOfUpdatedShedule, updatedShedule] = await Shedule.update({statusAppointment, userId}, {
            where: {
                id: Number(sheduleId),
            },
            returning: true,
            plain: true,
        })
        if (nmbOfUpdatedShedule === 0) {
            return res.status(404).json({message: 'Error while updating shedule'});
        }

        res.status(200).json({user: updatedShedule})


    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }

}

exports.ToCurrentTimeSlots = async (req, res) => {
    const {sheduleId, statusAppointment} = req.body


    try {

        const [nmbOfUpdatedShedule, updatedShedule] = await Shedule.update({statusAppointment}, {
            where: {
                id: Number(sheduleId),
            },
            returning: true,
            plain: true,
        })
        if (nmbOfUpdatedShedule === 0) {
            return res.status(404).json({message: 'Error while updating shedule'});
        }

        res.status(200).json({message: 'success!'})


    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }

}


exports.GetSlotsToDate = async (req, res) => {
    const {day, month, year, doctorId} = req.query

    const dateTime = new Date(year, month, Number(day) + 1);
    const dateQuery = dayjs(dateTime)
    const dateCurrent = dayjs()


    let shedulesDoctorRes = []
    if (!res?.locals?.user?.id) {
        if (dateQuery.isBefore(dateCurrent)) {

            const shedulesDoctor = await Shedule.findAll({
                where: {
                    doctorId,
                    date: dateTime,
                },
                include: [{model: Slot}],
            })
            for (const shedule of shedulesDoctor) {
                let sheduleId = shedule.id;
                const response = await fetch('http://localhost:4000/main/shedule/slots', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({sheduleId, statusAppointment: 'done'}),
                })
                const result = await response.json()
                if (response.status !== 200) {
                    throw new Error(result.message)
                }
            }

            shedulesDoctorRes = await Shedule.findAll({
                where: {
                    doctorId,
                    date: dateTime,
                    statusAppointment: {
                        [Op.or]: ['vacant', 'done', 'pending'],
                    },
                },
                include: [{model: Slot}],
            })
        }
        if (!dateQuery.isBefore(dateCurrent)) {

            shedulesDoctorRes = await Shedule.findAll({
                where: {
                    doctorId,
                    date: dateTime,
                    statusAppointment: {
                        [Op.or]: ['vacant', 'done', 'pending'],
                    },
                },
                include: [{model: Slot}],
            })
        }

    }

    if (res?.locals?.user?.id) {
        if (dateQuery.isBefore(dateCurrent)) {

            const shedulesDoctor = await Shedule.findAll({
                where: {
                    doctorId,
                    date: dateTime,
                },
                include: [{model: Slot}],
            })
            for (const shedule of shedulesDoctor) {
                let sheduleId = shedule.id
                const response = await fetch('http://localhost:4000/main/shedule/slots', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({sheduleId, statusAppointment: 'done'}),
                })
                const result = await response.json()
                if (response.status !== 200) {
                    throw new Error(result.message)
                }
            }
            shedulesDoctorRes = await Shedule.findAll({
                where: {
                    doctorId,
                    date: dateTime,
                },
                include: [{model: Slot}],
            })

        }
        if (!dateQuery.isBefore(dateCurrent)) {
            shedulesDoctorRes = await Shedule.findAll({
                where: {
                    doctorId,
                    date: dateTime,
                },
                include: [{model: Slot}],
            })
        }


    }

    const doctorShedule = shedulesDoctorRes.map((record) => {
        return {
            date: record.date,
            time: record.Slot.timeGap,
            status: record.statusAppointment,
            userId: record.userId,
            sheduleId: record.id
        }
    })


    if (doctorShedule.length) {
        res.json({doctorShedule})
    }
    if (!doctorShedule.length) {
        res.json({message: 'Nothing to show!'})
    }

}


exports.RandomDocClinic = async (req, res) => { //* получаем РАНДОМНО все клиники и докторов и топа (рейтинг боллее 4.5 без негативных отзывов) с подробной инфой и рейтингами
    const {adultPatients, childrenPatients, specialityName, countryName, cityName} = req.query

    const filterConditions = {};


    if (specialityName) {
        filterConditions.specialityName = specialityName;
    }
    if (countryName) {
        filterConditions.countryName = countryName;
    }
    if (cityName) {
        filterConditions.cityName = cityName;
    }
    if (adultPatients === 'true') {
        filterConditions.adultPatients = true;
    }
    if (childrenPatients === 'true') {
        filterConditions.childrenPatients = true;
    }

    if (adultPatients !== 'true' && childrenPatients !== 'true') {
        delete filterConditions.adultPatients;
        delete filterConditions.childrenPatients;
    }
    // console.log("-> filterConditions", filterConditions);

    try {
        const doctors = await Doctor.findAll({
            include: [
                {
                    model: Clinic,
                    include: [
                        {model: Address}
                    ]
                },
                {
                    model: Speciality,
                },
            ],
            raw: true,
            nest: true
        });


        const clinics = await Clinic.findAll({
            include: [
                {
                    model: Address,
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



        let readyClinicListNative = [];
        let readyDoctorListNative = [];


        if (res?.locals?.user?.id) {

            const ratingToUser = await Rating.findAll({where: {userId: res.locals.user.id}})

            readyClinicListNative = clinics.map(clinic => {
                const fulladdress = `${clinic.Address.streetName}, ${clinic.Address.cityName}, ${clinic.Address.countryName}`;
                let clinicRate;
                let ownRatingUser;
                ratingToUser?.forEach(element => {
                    if (element.userId === res.locals.user.id && clinic.id === element.clinicId) {
                        ownRatingUser = element.clinicRating
                    }
                })
                arrClinic?.forEach(el => {
                    if (Number(el[0]) === clinic.id) {
                        clinicRate = el[1]
                    }
                })
                return {
                    clinicId: clinic.id,
                    name: clinic.name,
                    phone: clinic.phone,
                    address: fulladdress,
                    email: clinic.email,
                    generalinfo: clinic.generalnfo,
                    clinicRating: clinicRate,
                    alreadyScoredPoints: ownRatingUser,
                    avatar: clinic.avatar
                }
            })

            readyDoctorListNative = doctors.map(
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
                        alreadyScoredPoints: ownRatingUserDoc,
                        avatar: doctor.avatar,
                    }
                }
            )

        }

        if (!res?.locals?.user?.id) {


            readyClinicListNative = clinics.map(clinic => {
                const fulladdress = `${clinic.Address.streetName}, ${clinic.Address.cityName}, ${clinic.Address.countryName}`;
                let clinicRate;


                arrClinic?.forEach(el => {
                    if (Number(el[0]) === clinic.id) {
                        clinicRate = el[1]
                    }
                })
                return {
                    clinicId: clinic.id,
                    name: clinic.name,
                    phone: clinic.phone,
                    address: fulladdress,
                    email: clinic.email,
                    generalinfo: clinic.generalnfo,
                    clinicRating: clinicRate,
                    avatar: clinic.avatar
                }
            })



            readyDoctorListNative = doctors.map(
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

        let readyClinicListNotGrouped = []
        let readyDoctorListNotGrouped = []


        // readyClinicListNotGrouped = readyClinicListNative?.filter((el) => Number(el.clinicRating) > 4.5)
        //
        // readyDoctorListNotGrouped = readyDoctorListNative?.filter((el) => Number(el.doctorRating) > 4.5)

        readyClinicListNotGrouped = readyClinicListNative?.filter((el) => {
            const clinicRatingFilter = Number(el.clinicRating) > 4.5;
            const countryFilter = filterConditions.countryName ? el.address.includes(countryName) : true;
            const cityFilter = filterConditions.cityName ? el.address.includes(cityName) : true;

            return clinicRatingFilter && countryFilter && cityFilter;
        });

        readyDoctorListNotGrouped = readyDoctorListNative?.filter((el) => {
            const doctorRatingFilter = Number(el.doctorRating) > 4.5;
            const adultFilter = filterConditions?.adultPatients ? el.adultPatients === adultPatients : true;
            const childrenFilter = filterConditions?.childrenPatients ? el.childrenPatients === childrenPatients : true;
            const specialityFilter = filterConditions.specialityName ? el.speciality === specialityName : true;
            const countryFilter = filterConditions.countryName ? el.address.includes(countryName) : true;
            const cityFilter = filterConditions.cityName ? el.address.includes(cityName) : true;

            return doctorRatingFilter && adultFilter && childrenFilter && specialityFilter && countryFilter && cityFilter;
        });


        let readyClinicList = []
        let readyDoctorList = []

        if (readyClinicListNotGrouped.length > 3) {
            while (readyClinicList.length < 3) {
                const randomIndex = Math.floor(Math.random() * readyClinicListNotGrouped.length);
                const randomElement = readyClinicListNotGrouped[randomIndex];
                if (!readyClinicList.includes(randomElement)) {
                    readyClinicList.push(randomElement);
                }
            }
        }
        if (readyClinicListNotGrouped.length <=3) {
            readyClinicList = [...readyClinicListNotGrouped]
        }


        if (readyDoctorListNotGrouped.length > 3) {
            while (readyDoctorList.length < 3) {
                const randomIndex = Math.floor(Math.random() * readyDoctorListNotGrouped.length);
                const randomElement = readyDoctorListNotGrouped[randomIndex];
                if (!readyDoctorList.includes(randomElement)) {
                    readyDoctorList.push(randomElement);
                }
            }
        }
        if (readyDoctorListNotGrouped.length <=3) {
            readyDoctorList = [...readyDoctorListNotGrouped]
        }




        // if (!readyClinicList.length && !readyDoctorList.length) {
        //     return res.status(409).json({message: "No clinics and doctors were found!"});
        // }


        res.json({readyClinicList, readyDoctorList})


    } catch
        (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
}
;



