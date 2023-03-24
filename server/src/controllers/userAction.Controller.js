const {Doctor, Message, Clinic, Address, Speciality, Rating, Slot, Review, Shedule, User} = require("../../db/models");
const {mailer} = require("./mailer.Controller");
const moment = require("moment/moment");

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
            where: {id: res?.locals?.user?.id},
            attributes: {exclude: ['password']},
            raw: true,
            nest: true
        })
        console.log("-> existingUser", existingUser);
        if (!userId) {
            return res.status(400).json({error: 'You should login firstly'});
        }

        // const email = existingUser.email
        const email = 'medical.app.work@gmail.com'


        const [nmbOfUpdatedShedule, updatedShedule] = await Shedule.update({statusAppointment, userId}, {
            where: {
                id: Number(sheduleId),
            },
            include: [{model: Doctor, include: [{model: Speciality},{model: Clinic, include:[{model: Address}]}]}, {model: User}, {model: Slot}],
            returning: true,
            plain: true,
        })


        if (!updatedShedule) {
            return res.status(404).json({error: 'Error while updating shedule'});
        }
        if (updatedShedule) {
            const existedAppointmentInfo = await Shedule.findOne({
                where: {
                    id: Number(sheduleId),
                },
                include: [{model: Doctor, include: [{model: Speciality},{model: Clinic, include:[{model: Address}]}]}, {model: User}, {model: Slot}],
                returning: true,
                plain: true,
            })
            const clinicName = existedAppointmentInfo.Doctor.Clinic.name
            const doctorName = `${existedAppointmentInfo.Doctor.firstName} ${existedAppointmentInfo.Doctor.lastName}`
            const dateAppointment = existedAppointmentInfo.date;
            const time = existedAppointmentInfo.Slot.timeGap;
            const doctorSpeciality = existedAppointmentInfo.Doctor.Speciality.name;
            const doctorId = existedAppointmentInfo.Doctor.id;
            const clinicId = existedAppointmentInfo.Doctor.Clinic.id

            const textToEmail = `Dear, ${existedAppointmentInfo.User.firstName}! You have been successful create an appointment with 
            doctor ${existedAppointmentInfo.Doctor.firstName} ${existedAppointmentInfo.Doctor.lastName} 
            (speciality: ${existedAppointmentInfo.Doctor.Speciality.name}) on ${existedAppointmentInfo.date}, ${existedAppointmentInfo.Slot.timeGap} 
            at ${existedAppointmentInfo.Doctor.Clinic.name}. Phone number of the doctor ${existedAppointmentInfo.Doctor.phone}. 
            Address - ${existedAppointmentInfo.Doctor.Clinic.Address.countryName}, ${existedAppointmentInfo.Doctor.Clinic.Address.cityName}, 
            ${existedAppointmentInfo.Doctor.Clinic.Address.streetName}`
            const subject = 'Appointment at medical agregator'
            const date = moment().format('YYYY-MM-DD HH:mm:ss.SSS Z');

            const newMessage = await Message.create({
                userId,
                textMessage: textToEmail,
                subject,
                status: false,
                clinicName,
                doctorName,
                dateAppointment,
                time,
                doctorSpeciality,
                dateMessage: date,
                doctorId,
                clinicId
            })

            // mailer(email, subject, textToEmail)
            return res.status(200).json({user: updatedShedule})
        }


    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
}


exports.GetUserMessage = async (req, res) => {
    try {
        const userId = res?.locals?.user?.id
        const allMessagesNative = await Message.findAll({where: {userId}, raw: true, nest: true});

        if (allMessagesNative.length) {
            res.status(200).json(allMessagesNative);
        }
        if (allMessagesNative.length === 0) {
            res.status(400).json({error: 'No messages found'});
        }

    } catch (e) {console.error(e);  res.status(500).json({message: 'Server error'});
    }

}

exports.DeleteUserMessage = async (req, res) => {
    try {
        const {messageId} = req.body

        const delMessage = await Message.destroy({where: {id: messageId}})

        if (delMessage) {
            res.status(200).json({message: 'Deleting was successful!'});
        }
        if (delMessage === 0) {
            res.status(400).json({error: 'Error while deleting message!'});
        }


    } catch (e) { console.error(e);  res.status(500).json({message: 'Server error'});
    }


}
