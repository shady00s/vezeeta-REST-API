//const doctorSearch = require('../controllers/reusableControllers/searchController')
import { doctorsCollection, getPendingDoctors, usersCollection, subAdminProfile, subAdminRegistration, subAdminLogin, getDeletedDoctors } from '../controllers/subAdminController.js'
import { Router } from 'express'
const subAminRoutes = Router()
import SubAdminVerifyToken from '../verifications/subAdminVerification.js'

import upload from '../utils/multer.js'
import { getDoctorById } from '../controllers/doctorControllers.js'


subAminRoutes.get('/sub-admin-all-doctors', SubAdminVerifyToken, doctorsCollection)
subAminRoutes.get('/sub-admin-all-users', SubAdminVerifyToken, usersCollection)
subAminRoutes.get('/sub-admin-pending-doctors', SubAdminVerifyToken, getPendingDoctors)
subAminRoutes.get('/sub-admin-deleted-doctors', SubAdminVerifyToken, getDeletedDoctors)
//subAminRoutes.get('/sub-admins-search-doctors',SubAdminVerifyToken, doctorSearch)
subAminRoutes.get('/sub-admin-profile-doctor/:id', upload.single('profileImagePath'), SubAdminVerifyToken, getDoctorById)



// sub admin routing
subAminRoutes.get('/sub-admin-login', subAdminLogin)
subAminRoutes.put('/sub-admin-register', upload.single('subAdminprofileImagePath'), subAdminRegistration)
subAminRoutes.get('/sub-admin-profile/:id', SubAdminVerifyToken, subAdminProfile)


export default subAminRoutes
