import SubAdminModel from '../models/subAdminModel.js';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userModel from '../models/userModel.js';
import cloudinary from '../utils/cloudinaryConfig.js';
import dotenv  from "dotenv"
dotenv.config()

function doctorsCollection(req, res) {
    const page = req.query.page || 1;
    const limitPerPage = 100;
    let doctorsCount
   doctorModel.find().countDocuments().then(e => {
        doctorsCount = e

        returndoctorModel.find().skip((page - 1) * limitPerPage).limit(limitPerPage)
    }

    ).then(docResults => res.status(200).json({
        message: "succssess",
        page: page,
        totalPages: Math.ceil(doctorsCount / limitPerPage),
        total_doctors: doctorsCount,
        body: docResults

    }))

}
function usersCollection(req, res) {
    const page = req.query.page || 1
    let usersCount
    let limitPerPage = 100

    userModel.find().countDocuments().then(count => {
        usersCount = count

        return userModel.find().skip((page - 1) * limitPerPage).limit(limitPerPage)
    }).then(results => res.status(200).json({
        page: page,
        total_pages: Math.ceil(usersCount / limitPerPage),
        users_count: usersCount,
        body: results

    })).catch(e => res.status(400).json({
        message: "failed there is and error"
    }))
}

function subAdminLogin(req, res) {
    const email = req.body.subAdminEmail
    const password = req.body.subAdminPassword
    SubAdminModel.findOne({ subAdminEmail: email }).then(result => {

        bcrypt.compare(password, result.subAdminPassword).then(compareResult => {

            if (compareResult) {
                const token = jwt.sign({ id: compareResult._id }, process.env.SUB_ADMIN_TOKEN)
                res.header('sub-admin-token', token).status(200).json({
                    message: "succsess",
                    body: result
                })
            }
            else {
                res.status(400).json({
                    message: "wrong password"
                })
            }
        }).catch(e => res.status(400).json({
            message: "email is not found",
            body: e
        }))
    }

    ).catch(e => res.status(400).json({
        message: "there is an error",
        body: e
    }))
}

async function subAdminRegistration(req, res) {
    const subAdminName = req.body.subAdminName;
    const subAdminEmail = req.body.subAdminEmail;
    const subAdminPassword = req.body.subAdminPassword;
    const subAdminprofileImagePath = req.file;
    const mainSubAdminAuthenticationCode = req.body.mainSubAdminAuthenticationCode;

    const confirmationCode = "asf@!sdfc"


    // check if email is existed
    const isAdminEmailExisted = await SubAdminModel.findOne({ subAdminEmail: subAdminEmail })
    // check if validation code is the same
    if (!isAdminEmailExisted) {
        if (confirmationCode === mainSubAdminAuthenticationCode) {
            // hashing the password


            const hashedPassword = await hash(subAdminPassword, 12)
            cloudinary.uploader.upload_stream({ folder: "sub-admin-images" },

                (err, results) => {

                    if (err) {
                        res.status(500).json({
                            message: "there is error in image",
                            body: err
                        })
                    }
                    const subAdminData = new SubAdminModel({
                        subAdminName: subAdminName,
                        subAdminEmail: subAdminEmail,
                        subAdminPassword: hashedPassword,
                        subAdminProfileImagePath: results.url,
                    })

                    subAdminData.save().then(result => {
                        const token = jwt.sign({ id: result._id }, process.env.SUB_ADMIN_TOKEN)
                        res.header('sub-admin-token', token).status(201).json({
                            message: "succssess",
                            body: result
                        })
                    }).catch(e => res.status(401).json({
                        message: "failed",
                        body: e
                    }))

                }


            ).end(subAdminprofileImagePath.buffer)

        } else {
            res.status(401).json({
                message: "wrong verification code"
            })
        }
    }
    else {
        res.status(401).json({
            message: "Email is already existed",

        })

    }
}


function subAdminProfile(req, res) {
    const id = req.params.id
    SubAdminModel.findById(id).then(result => {
        res.status(200).json({
            message: "succssess",
            body: result
        })
    }).catch(e => res.status(400).json({
        message: "there is error ,please try again"
    }))
}

function getPendingDoctors(req, res) {
    const page = req.query.page || 1
    let doctorsCount
    const pageLimit = 100
   doctorModel.find({ profileStatus: "pending" }).countDocuments().then(countRes => {
        doctorsCount = countRes
        returndoctorModel.find({ profileStatus: "pending" }).skip((page - 1) * pageLimit).limit(pageLimit)
    }
    ).then(docs =>
        res.status(200).json({
            message: "succssess",
            page: page,
            totalPages: Math.ceil(doctorsCount / pageLimit),
            doctorsCount: doctorsCount,
            body: docs
        })
    ).catch(e => res.status(400).json({
        message: "failed",
        body: e
    }))
}
function getDeletedDoctors(req, res) {
    const page = req.query.page || 1
    let doctorsCount
    const pageLimit = 100
   doctorModel.find({ profileStatus: "rejected" }).countDocuments().then(countRes => {
        doctorsCount = countRes
        returndoctorModel.find({ profileStatus: "rejected" }).skip((page - 1) * pageLimit).limit(pageLimit)
    }
    ).then(docs =>
        res.status(200).json({
            message: "succssess",
            page: page,
            totalPages: Math.ceil(doctorsCount / pageLimit),
            doctorsCount: doctorsCount,
            body: docs
        })
    ).catch(e => res.status(400).json({
        message: "failed",
        body: e
    }))
}












export  { doctorsCollection, usersCollection, subAdminLogin, subAdminRegistration, subAdminProfile, getPendingDoctors, getDeletedDoctors }