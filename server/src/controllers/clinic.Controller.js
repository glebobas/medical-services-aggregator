const {User, Doctor, Clinic, Address, Speciality, Rating, Review} = require('../../db/models')





exports.ExactClinic = async (req, res) => {
    try {
        const {clinicId, lang} = req.query;
        console.log("-> req.query", req.query);


        const reviewsNative = await Review.findAll({where: {clinicId}, include: [
                {
                    model: User,
                    include: [
                        {model: Rating, where: {clinicId}}
                    ]
                },
            ],
            raw: true,
            nest: true})



      const reviewsReady = reviewsNative.map(el => {
          let fullname = el.User.firstName + ' ' + el.User.lastName
          if (el.User.firstName === null || el.User.lastName === null) {
              fullname = 'Anonimous'
          }

          return {
              date: el.date,
              reviewId: el.id,
              reviewText: el.clinic_review,
              clinicId: el.clinicId,
              reviewerName: fullname,
              rating: el.User.Ratings.clinicRating || 0
          }
      })

        const clinic = await Clinic.findOne({where: {id: clinicId}, include: [{model: Address}]})
        // const doctors = await Doctor.findAll({where: {clinicId}})
        const doctors = await Doctor.findAll({
            where: {clinicId},
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

        const responseRating = await Rating.findAll({where: {clinicId}})

        const clinicRating = responseRating.reduce((acc, val) => {
            acc += val.clinicRating;
            return acc
        }, 0)
        const averageClinicRating = (clinicRating / responseRating.length).toLocaleString('en-US', {maximumFractionDigits: 1})
        let readyClinic;
        if (res?.locals?.user?.id) {
            const ratingToUser = await Rating.findAll({where: {userId: res.locals.user.id}})
            readyClinic = [clinic].map((el) => {
                const fulladdress = `${el.Address.streetName}, ${el.Address.cityName}, ${el.Address.countryName}`;
                let ownRatingUser;
                ratingToUser?.forEach(element => {
                    if (element.userId === res.locals.user.id && el.id === element.clinicId) {
                        ownRatingUser = element.clinicRating
                    }
                })
                return {
                    id: el.id,
                    name: el.name,
                    email: el.email,
                    phone: el.phone,
                    address: fulladdress,
                    generalInfo: el.generalnfo,
                    averageClinicRating,
                    alreadyScoredPoints: ownRatingUser,
                    avatar: el.avatar
                }
            })
        }
        if (!res?.locals?.user?.id) {

            readyClinic = [clinic].map((el) => {
                const fulladdress = `${el.Address.streetName}, ${el.Address.cityName}, ${el.Address.countryName}`;
                return {
                    id: el.id,
                    name: el.name,
                    email: el.email,
                    phone: el.phone,
                    address: fulladdress,
                    generalInfo: el.generalnfo,
                    averageClinicRating,
                    avatar: el.avatar
                }
            })
        }

        if (clinic.id) {
            res.json({readyClinic, readyDoctorList, reviewsReady})
        } else res.json({message: "Couldn't find clinic"})
    } catch (e) {
        console.error(e)
    }
};


