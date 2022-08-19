
import AdminModel from '../models/adminModel.js';
import doctorModel from '../models/doctorModel.js';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cloudinary from '../utils/cloudinaryConfig.js';
import dotenv  from "dotenv"
dotenv.config()


function doctorsCollection(req, res) {
    const page = req.query.page || 1;
    const limitPerPage = 100;
    let doctorsCount
    doctorModel.find().countDocuments().then(e => {
        doctorsCount = e

        return doctorModel.find().skip((page - 1) * limitPerPage).limit(limitPerPage)
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

function adminLogin(req, res) {
    const email = req.body.adminEmail || ''
    const password = req.body.password || ''
    AdminModel.findOne({ adminEmail: email }).then(result =>
        bcrypt.compare(password, result.password).then(compareResult => {
            if (compareResult) {
                const token = jwt.sign({ id: compareResult._id }, process.env.ADMIN_TOKEN_SECRET)
                res.header('admin-token', token).status(200).json({
                    message: "succsess",
                    body: result
                })
            } else {
                res.status(400).json({ message: 'wrong email' })
            }
        }).catch(e => res.status(400).json({ message: "there is an error", err: e }))
    )
}

function adminRegistration(req, res, next) {
    const adminName = req.body.adminName;
    const adminEmail = req.body.adminEmail;
    const password = req.body.password;
    const mainAdminAuthenticationCode = req.body.mainAdminAuthenticationCode;
    const profileImagePath = req.file.path;


   
    const confirmationCode = "q2123@1vfd"

    // check if email is existed
    AdminModel.findOne({ adminEmail: adminEmail }).then(isAdminEmailExisted => {
        // check if validation code is the same

        if (mainAdminAuthenticationCode === confirmationCode) {
            if (!isAdminEmailExisted) {

                bcrypt.hash(password, 12).then(hashedPassword => {

                    cloudinary.uploader.upload(profileImagePath, { folder: "admin-images" }, function (error, result) { console.log(result, error); }).then(imagePath => {


                        // hashing the password


                        const adminData = new AdminModel({
                            adminName: adminName,
                            adminEmail: adminEmail,
                            password: hashedPassword,
                            profileImagePath: profileImagePath,

                        })

                        adminData.save().then(result => {

                            const token = jwt.sign({ _id: result.id }, process.env.ADMIN_TOKEN_SECRET)

                            res.header(token).status(201).json({
                                message: "succssess",
                                body: result
                            })
                        }

                        ).catch(e => res.status(401).json({
                            message: "failed",
                            body: e
                        }))



                    }


                    )

                })

            } else {
                res.status(401).json({
                    message: "Email is already existed",

                })
            }
        }
        else {
            res.status(401).json({
                message: "wrong verification code"
            })
        }
    })
}

function adminProfile(req, res) {
    const id = req.params.id
    AdminModel.findById(id).then(result => {
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
        return doctorModel.find({ profileStatus: "pending" }).skip((page - 1) * pageLimit).limit(pageLimit)
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
        return doctorModel.find({ profileStatus: "rejected" }).skip((page - 1) * pageLimit).limit(pageLimit)
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


function adminEditDoctor(req, res) {
    const id = req.params.id;
    const doctorEdited = {
        profileStatus: req.body.profileStatus
    }
    AdminModel.findByIdAndUpdate({ _id: id }, doctorEdited, { new: true }).then(result => {
        res.status(200).json({
            message: "succssess",
            body: result
        })
    })
}


function deleteDrByAdmin(req, res) {
    const id = req.params.id;
    const doctorEdited = {
        profileStatus: req.body.profileStatus
    }
    AdminModel.findByIdAndUpdate({ _id: id }, doctorEdited, { new: true }).then(result => {
        res.status(200).json({
            message: "succssess",
            body: result
        })
    })
}










export  { doctorsCollection, usersCollection, adminLogin, adminRegistration, adminProfile, getPendingDoctors, adminEditDoctor, getDeletedDoctors ,deleteDrByAdmin}















// app.post('/upload', (req, res) => {
//   upload(req, res, (err) => {
//     if(err){
//       res.render('index', {
//         msg: err
//       });
//     } else {
//       if(req.file == undefined){
//         res.render('index', {
//           msg: 'Error: No File Selected!'
//         });
//       } else {
//         res.render('index', {
//           msg: 'File Uploaded!',
//           file: `uploads/${req.file.filename}`
//         });
//       }
//     }
//   });
// });
