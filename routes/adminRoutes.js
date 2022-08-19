import { doctorsCollection, usersCollection, adminLogin, adminRegistration, adminProfile, getPendingDoctors, adminEditDoctor, getDeletedDoctors, deleteDrByAdmin } from '../controllers/adminController.js'
import {adminDoctorSearchController} from '../controllers/reusableControllers/adminSearchController.js'
import { Router } from 'express'

import AdminVerifyToken from '../verifications/adminVerification.js'

import { getDoctorById } from '../controllers/doctorControllers.js'
const adminRoutes = Router()


import upload from '../utils/multer.js';


// doctors  routing
adminRoutes.get('/admin-pending-doctors', AdminVerifyToken, getPendingDoctors)
adminRoutes.get('/admin-deleted-doctors', AdminVerifyToken, getDeletedDoctors)
adminRoutes.get('/admin-search-doctors', AdminVerifyToken, adminDoctorSearchController)
adminRoutes.get('/admin-doctor-profile/:id', AdminVerifyToken, getDoctorById)

adminRoutes.put('/admin-edit-doctor/:id', upload.single('profileImagePath'), AdminVerifyToken, adminEditDoctor)

adminRoutes.put('/admin-delete-doctor/:id', AdminVerifyToken, deleteDrByAdmin)


// admin routing
adminRoutes.get('/admin-login', adminLogin)
adminRoutes.put('/admin-register', upload.single('profileImagePath'), adminRegistration)
adminRoutes.get('/admin-all-users', AdminVerifyToken, usersCollection)
adminRoutes.get('/admin-all-doctors', AdminVerifyToken, doctorsCollection)
adminRoutes.get('/admin-profile/:id', AdminVerifyToken, adminProfile)


export default adminRoutes