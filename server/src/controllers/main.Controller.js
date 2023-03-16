const {Doctor, Clinic, Address, Speciality, Rating} = require("../../db/models");
const {Op} = require("sequelize");


exports.GetAllClinicAndDoctors = async (req, res) => { //* ПО ИНПУТУ получаем все клиники и докторов с подробной инфой и рейтингами
    try {
        const {inputText} = req.params
        // console.log('12123123', res.locals.user);
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


        const readyClinicList = clinics.map(clinic => {
            const fulladdress = `${clinic.Address.streetName}, ${clinic.Address.cityName}, ${clinic.Address.countryName}`;
            let clinicRate;
            arrClinic.forEach(el => {
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
            }
        })

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
                }
            }
        )

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


        const readyClinicList = clinics.map(clinic => {
            const fulladdress = `${clinic.Address.streetName}, ${clinic.Address.cityName}, ${clinic.Address.countryName}`;
            let clinicRate;
            arrClinic.forEach(el => {
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
            }
        })

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
                }
            }
        )

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
