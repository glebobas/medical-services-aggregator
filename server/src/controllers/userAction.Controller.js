const {Doctor, Clinic, Address, Speciality, Rating, Slot, Review, Shedule, User} = require("../../db/models");
const {mailer} = require("./mailer.Controller");

exports.DeleteReview = async (req, res) => {
    try {
        const {reviewId} = req.body;

        if (reviewId) {
            const deletedReview = await Review.destroy(
                {
                    where: {id: reviewId},
                }
            );

            if (deletedReview === 0) {
                return res.status(404).json({message: 'Error while deleting'});
            }
            res.status(200).json({message: 'Deleting was successful'});
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

exports.EditReviewWithRating = async (req, res) => {
    try {
        const {reviewId, doctorId, clinicId, reviewText, rating} = req.body;
        const userId = res?.locals?.user?.id

        //* апдейтим отзыв

        if (reviewText && clinicId) {
            const [numUpdated, updatedReview] = await Review.update(
                {
                    clinic_review: reviewText
                },
                {
                    where: {id: reviewId},
                    returning: true
                }
            );
            if (numUpdated === 0) {
                return res.status(404).json({message: 'Review was not found'});
            }
            return res.status(200).json({message: 'Update was successful'});
        }
        if (reviewText && doctorId) {
            const [numUpdated, updatedReview] = await Review.update(
                {
                    doctor_review: reviewText
                },
                {
                    where: {id: reviewId},
                    returning: true
                }
            );
            if (numUpdated === 0) {
                return res.status(404).json({message: 'Review was not found'});
            }
            return res.status(200).json({message: 'Update was successful'});
        }
        if (rating && clinicId) {
            const [numUpdated, updatedRating] = await Rating.update(
                {
                    clinicRating: Number(rating)
                },
                {
                    where: {userId, clinicId},
                    returning: true
                }
            );
            if (numUpdated === 0) {
                return res.status(404).json({message: 'Clinic\'s rating was not found'});
            }
            return res.status(200).json({message: 'Update was successful'});
        }

        if (rating && doctorId) {
            const [numUpdated, updatedRating] = await Rating.update(
                {
                    doctorRating: Number(rating)

                },
                {
                    where: {userId, doctorId},
                    returning: true
                }
            );
            if (numUpdated === 0) {
                return res.status(404).json({message: 'Doctor\'s rating not found'});
            }
            return res.status(200).json({message: 'Update was successful'});
        } else return res.status(409).json({message: 'Fill necessary data'})


    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

exports.NewReview = async (req, res) => {
    const {doctorId, clinicId, reviewText} = req.body;
    const userId = res?.locals?.user?.id
    const date = new Date().toISOString().slice(0, 10)

    try {
        if (doctorId) {
            const review = await Review.findOne({where: {userId, doctorId}})
            if (!review) {
                const data = await Review.create({userId, doctorId, doctor_review: reviewText, date})
                if (data) {
                    return res.status(200).json({message: 'success adding review for doctor'})
                }
                if (!data) {
                    return res.status(404).json({message: 'Error creating review for doctor'})
                }
            }
            if (review) {
                return res.status(404).json({message: 'You have already added review for this doctor'})
            }
        }
        if (clinicId) {
            const review = await Review.findOne({where: {userId, clinicId}})
            if (!review) {
                const data = await Review.create({userId, clinicId, clinic_review: reviewText, date})
                if (data) {
                    return res.status(200).json({message: 'success adding review for clinic'})
                }
                if (!data) {
                    return res.status(404).json({message: 'Error creating review for clinic'})
                }
            }
            if (review) {
                return res.status(404).json({message: 'You have already added review for this clinic'})
            }
        } else return res.status(409).json({message: 'Fill necessary data'})
    } catch (e) {
        console.error(e)
        res.status(500).json({message: 'Internal server error'});
    }
}


exports.NewRating = async (req, res) => {
    const {doctorId, clinicId, clinicRating, doctorRating} = req.body;
    const userId = res?.locals?.user?.id
    // console.log('userId=====>', userId)
    try {
        if (doctorId && doctorRating) {
            const rating = await Rating.findOne({where: {userId, doctorId}})
            if (!rating) {
                const data = await Rating.create({userId, doctorId, doctorRating})
                if (data) {
                    return res.status(200).json({message: 'success adding rating for doctor'})
                }
                if (!data) {
                    return res.status(404).json({message: 'Error adding rating for doctor'})
                }
            }
            if (rating) {
                return res.status(404).json({message: 'You have already rate this doctor'})
            }
        }
        if (clinicId && clinicRating) {
            const rating = await Rating.findOne({where: {userId, clinicId}})
            if (!rating) {
                const data = await Rating.create({userId, clinicId, clinicRating})
                if (data) {
                    return res.status(200).json({message: 'success adding rating for clinic'})
                }
                if (!data) {
                    return res.status(404).json({message: 'Error creating rating for clinic'})
                }
            }
            if (rating) {
                return res.status(404).json({message: 'You have already added rating for this clinic'})
            }
        } else return res.status(409).json({message: 'Fill necessary data'})
    } catch (e) {
        console.error(e)
        res.status(500).json({message: 'Internal server error'});
    }
}


exports.NewEntry = async (req, res) => {
    const {sheduleId, statusAppointment} = req.body

    const userId = res?.locals?.user?.id


    try {

        const existingUser = await User.findOne({
            where: {id: res.locals.user.id},
            attributes: {exclude: ['password']},
            raw: true,
            nest: true
        })

        const email = existingUser.email


        const [nmbOfUpdatedShedule, updatedShedule] = await Shedule.update({statusAppointment, userId}, {
            where: {
                id: Number(sheduleId),
            },
            include: [{model: Doctor, include: [{model: Speciality}]}, {model: User}, {model: Slot}],
            returning: true,
            plain: true,
        })


        // console.log("-> existedShedule", existedShedule);


        if (!updatedShedule) {
            return res.status(404).json({message: 'Error while updating shedule'});
        }
        if (updatedShedule) {
            const existedAppointmentInfo = await Shedule.findOne({
                where: {
                    id: Number(sheduleId),
                },
                include: [{model: Doctor, include: [{model: Speciality}]}, {model: User}, {model: Slot}],
                returning: true,
                plain: true,
            })
            const textToEmail = `Dear, ${existedAppointmentInfo.User.firstName}! You have been successful create an appointment with doctor ${existedAppointmentInfo.Doctor.firstName} ${existedAppointmentInfo.Doctor.lastName} (speciality: ${existedAppointmentInfo.Doctor.Speciality.name}) on ${existedAppointmentInfo.date}, ${existedAppointmentInfo.Slot.timeGap}`
            const subject = 'Appointment at medical agregator'
            mailer(email, subject, textToEmail)
            return res.status(200).json({user: updatedShedule})
        }


    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }

}
