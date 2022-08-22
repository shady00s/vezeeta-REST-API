import doctorModel from "../models/doctorModel.js";
import { doctorGenerator } from '../generators/doctorGenerators.js';
import bcyrpt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv"
dotenv.config()

function doctorsByLocationAndSpecalizationController(req, res) {
    let location = req.query.location || 'All-cities'
    let EnglishSpecialization = req.query.English_specialization || ''
    let ArabicSpecialization = req.query.Arabic_specialization || ''


    // page number and number of doctors

    let page = req.query.page || 1;
    let limitPerPage = 30;
    let totalItems

    if (location === 'All-cities') {
        if (EnglishSpecialization != '' && ArabicSpecialization == '') {
            doctorModel.find({ doctorSpecialization_english: EnglishSpecialization, profileStatus: "accepted" }).countDocuments().then(results => {
                totalItems = results
                return doctorModel.find({ doctorSpecialization_english: EnglishSpecialization, profileStatus: "accepted" }).skip((page - 1) * limitPerPage).limit(limitPerPage)
            }).then(docResults =>
                res.status(200).json({
                    page: page,
                    totalPages: Math.ceil(totalItems / limitPerPage),
                    total_doctors: totalItems,
                    message: "success",
                    body: docResults
                })).catch(e => res.status(400).json({ message: "Canot doctorModel.find any doctor" }))
        }
        else {
            doctorModel.find({ doctorSpecialization_arabic: ArabicSpecialization, profileStatus: "accepted" }).countDocuments().then(results => {
                totalItems = results
                return doctorModel.find({ doctorSpecialization_arabic: ArabicSpecialization, profileStatus: "accepted" }).skip((page - 1) * limitPerPage).limit(limitPerPage)
            }).then(drResults => res.status(200).json({
                page: page,
                totalPages: Math.ceil(totalItems / limitPerPage),
                total_doctors: totalItems,
                message: "success",
                body: drResults
            })).catch(e => res.status(400).json({ message: "Canot doctorModel.find any doctor" }))
        }


    }
    else {
        if (EnglishSpecialization != '' && ArabicSpecialization == '') {
            doctorModel.find({ doctorLocation: location, doctorSpecialization_english: EnglishSpecialization, profileStatus: "accepted" }).countDocuments().then(results => {
                totalItems = results
                return doctorModel.find({ doctorLocation: location, doctorSpecialization_english: EnglishSpecialization, profileStatus: "accepted" }).skip((page - 1) * limitPerPage).limit(limitPerPage)

            }).then(drResults => res.status(200).json({
                page: page,
                totalPages: Math.ceil(totalItems / limitPerPage),
                total_doctors: totalItems,
                message: "success",
                body: drResults
            })).catch(e => res.status(400).json({ message: "Canot doctorModel.find any doctor" }))
        }
        else {
            doctorModel.find({ doctorLocation: location, doctorSpecialization_arabic: ArabicSpecialization, profileStatus: "accepted" }).countDocuments().then(results => {
                totalItems = results
                return doctorModel.find({ doctorLocation: location, doctorSpecialization_arabic: ArabicSpecialization, profileStatus: "accepted" }).skip((page - 1) * limitPerPage).limit(limitPerPage)

            }).then(drResults => res.status(200).json({
                page: page,
                totalPages: Math.ceil(totalItems / limitPerPage),
                total_doctors: totalItems,
                message: "success",
                body: drResults
            })).catch(e => res.status(400).json({ message: "Canot doctorModel.find any doctor" }))
        }
    }

}

async function doctorRegistrationController(req, res) {

    let profileImagePath = req.files.profileImagePath[0]
    let certificateImagePath = req.files.certificateImagePath[0]

    let clinicImagesPath = []

    req.files.clinicImagesPath.forEach(element => clinicImagesPath.push(element.buffer));


    let isEmailExisted = await doctorModel.find({ doctorEmail: req.body.doctorEmail })
    if (!isEmailExisted) {


        cloudinary.uploader.upload_stream({
            folder: 'doctor-images/profile-pics'
        }, (err, profileImagePath) => {

            cloudinary.uploader.upload_stream({
                folder: 'doctor-images/certificate-pics'
            }, (err, certificateImagePath) => {


                cloudinary.uploader.upload_stream({
                    folder: 'doctor-images/clinic-pics'
                }, (err, FirstCinicImagesPath) => {

                    let clinicImagesPathObject = []

                    clinicImagesPathObject.push({ "image": FirstCinicImagesPath.url })

                    cloudinary.uploader.upload_stream({
                        folder: 'doctor-images/clinic-pics'
                    }, (err, SecondCinicImagesPath) => {




                        clinicImagesPathObject.push({ "image": SecondCinicImagesPath.url })

                        cloudinary.uploader.upload_stream({
                            folder: 'doctor-images/clinic-pics'
                        }, (err, thirdClinicImagePath) => {



                            clinicImagesPathObject.push({ "image": thirdClinicImagePath.url })

                            const doctor = new doctorModel({
                                doctorName: req.body.doctorName,
                                doctorEmail: req.body.doctorEmail,
                                password: req.body.password,
                                doctorGender: req.body.doctorGender,
                                doctorSpecialization: req.body.doctorSpecialization,
                                doctorLocation: req.body.doctorLocation,
                                doctorClinics: req.body.doctorClinics,
                                profileImagePath: profileImagePath.url,
                                certificateImagePath: certificateImagePath.url,
                                clinicImagesPath: clinicImagesPathObject,
                                fees: req.body.fees,
                                entity: req.body.entity,
                                clinicWaitingTime: req.body.clinicWaitingTime,
                                doctorAppointments: req.body.doctorAppointments
                            })





                        }).end(clinicImagesPath[2])



                    }).end(clinicImagesPath[1])


                }).end(clinicImagesPath[0])



            }).end(certificateImagePath.buffer)
        }).end(profileImagePath.buffer)

        doctor.save().then(result => {
            res.status(200).json({
                message: "succssess",
                body: result
            })
        }).catch(e => res.status(400).json({
            message: "there is an error",
            body: e
        }))
    }
    else {
        res.status(400).json({
            message: "this email is aleady exists"
        })
    }





}

function generator(req,res){
    

    doctorGenerator(res)
}

function getDoctorById(req, res) {
    let id = req.params.id
    doctorModel.findById(id).then(results => res.status(200).json({
        message: 'sucssess',
        body: results
    })).catch(e => res.status(400).json(e))
}

function doctorLogin(req, res) {
    const email = req.body.doctorEmail
    const password = req.body.password
    doctorModel.findOne({ doctorEmail: email }).then(result => {
        if (result.profileStatus === 'accepted') {
            bcyrpt.compare(password, result.password).then(compareResult => {
                if (compareResult) {
                    const token = jwt.sign({ id: compareResult._id }, process.env.DOCTOR_TOKEN_SECRET)
                    res.header('doctor-token', token).status(200).json({
                        message: "succsess",
                        body: result
                    })
                }
            })
        } else if (result.profileStatus === 'pending') {
            res.status(200).json({
                message: "your account is being worked on. "
            })
        }
        else {
            res.status(400).json({
                message: "cant log in the account is deleted, please contact with vezeeta technical center"
            })
        }

    }

    )
}

function doctorEditController(req, res) {
    const id = req.params.id

    const doctorUpdatedData = {

        doctorEmail: req.body.doctorEmail,
        password: req.body.password,
        doctorSpecialization: req.body.doctorSpecialization,
        doctorLocation: req.body.doctorLocation,
        doctorClinics: req.body.doctorClinics,
        profileImagePath: req.body.profileImagePath,
        clinicImagesPath: req.body.clinicImagesPath,
        fees: req.body.fees,
        profileStatus: req.body.profileStatus,
        doctorAppointments:req.body.doctorAppointments
    }
    doctorModel.findByIdAndUpdate(id, doctorUpdatedData, { new: true }).then(result =>
        res.status(200).json({
            message: "succssess",
            body: result
        })
    )
}

export { doctorsByLocationAndSpecalizationController, doctorRegistrationController, getDoctorById, doctorLogin, doctorEditController,generator }




