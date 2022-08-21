import userModel from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import doctorModel from '../models/doctorModel.js'

import cloudinary from '../utils/cloudinaryConfig.js'
import { json } from 'express'
import dotenv  from "dotenv"
dotenv.config()

async function userRegister(req, res) {

    let name = req.body.userName
    let userPassword = req.body.userPassword
    let email = req.body.userEmail
    let userAge = req.body.userAge
    let userProfileImagePath = req.file

    let userAppointent = req.body.userAppointent

    let isEmailExisted = await userModel.findOne({ userEmail: email })

    // if email is new
    if (!isEmailExisted) {
        let hashedPassword = await bcrypt.hash(userPassword, 12)

        cloudinary.uploader.upload_stream({ folder: "users-images" }, (err, results) => {
            const userReg = new userModel({
                userName: name,
                userPassword: hashedPassword,
                userEmail: email,
                userAge: userAge,
                userProfileImagePath: results.url,
                userAppointments: userAppointent
            })

            userReg.save().then(result => {
                const token = jwt.sign({ _id: result._id }, process.env.USER_TOKEN_SECRET)

                res.header('user-token', token).status(201).json({
                    message: "succssess",
                    body: result
                })
            }
            )

        }).end(userProfileImagePath.buffer)


    } else {
        res.status(401).json({
            message: "faild this email is already taken"
        })
    }


}

function userLogin(req, res) {
    let email = req.body.userEmail
    let pass = req.body.userPassword


    userModel.findOne({ userEmail: email }).then(result => {
        // check if the password is correct
        let hashedPass = bcrypt.compare(pass, result.userPassword)
        if (hashedPass) {

            const token = jwt.sign({ _id: result._id }, process.env.USER_TOKEN_SECRET)

            res.header('user-token', token).status(200).json({
                message: "succssess",
                body: result
            })

        }
        else {
            res.status(400).json({
                message: "failed the password is incorrect",
            })
        }


    }

    )
}
function userProfile(req, res) {
    const id = req.params.id
    userModel.findById({ _id: id }).then(result =>
        res.status(200).json({
            message: "succssess",
            body: result
        })
    ).catch(e => res.json({ body: e }))
}

function userEditProfile(req, res) {
    const user_id = req.params.id
    const userName = req.body.userName
    const userEmail = req.body.userEmail
    const userPassword = req.body.userPassword
    const userProfileImagePath = req.file
    const userAppointments = req.body.userAppointments

    cloudinary.uploader.upload_stream({ folder: "users-images" }, (err, image => {

        if (err) {
            res.status(500).json({
                message: "there is error in image uploading",
                body: err
            })
        }
        const updatedUserData = {
            userName: userName,
            userEmail: userEmail,
            userPassword: userPassword,
            userProfileImagePath: userProfileImagePath,
            userAppointments: userAppointments
        }

        userModel.findByIdAndUpdate(user_id, updatedUserData, { new: true }).then(result =>
            res.status(200).json({
                message: "succssess",
                body: result
            })).catch(e => {
                res.status(400).json({
                    message: "there is error in registration"
                })
            })
    })).end(userProfileImagePath.buffer)





}


function userAddAppointment(req,res){
    const user_id = req.body.id
    const userAppointments = req.body.userAppointments
    userModel.findByIdAndUpdate(user_id, { $push: {userAppointments:userAppointments }}, { new: true }).then(result =>
        res.status(200).json({
            message: "succssess",
            body: result
        })).catch(e => {
            res.status(400).json({
                message: "there is error in registration"
            })
        })
    
}

export  { userRegister, userLogin, userProfile,userEditProfile, userAddAppointment }