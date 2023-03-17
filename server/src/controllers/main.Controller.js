const {Doctor, Clinic, Address, Speciality, Rating} = require("../../db/models");
const {Op} = require("sequelize");
const express = require('express');
const app = express();


exports.GetAllClinicAndDoctors = async (req, res) => { //* ПО ИНПУТУ получаем все клиники и докторов с подробной инфой и рейтингами

    try {
        const {inputText} = req.params


        const doctors = await Doctor.findAll({
            where: {
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


        res.json({readyClinicList, readyDoctorList, doctors})


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
