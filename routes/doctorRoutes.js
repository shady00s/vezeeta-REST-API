import { Router } from 'express';
import { doctorsByLocationAndSpecalizationController, doctorRegistrationController, getDoctorById, doctorEditController, doctorLogin, generator } from '../controllers/doctorControllers.js';
import DoctorVerifyToken from '../verifications/doctorVerfication.js';
const doctorRoutes = Router()

import upload from '../utils/multer.js';


doctorRoutes.get('/doctors', doctorsByLocationAndSpecalizationController)

doctorRoutes.get('/doctor-profile/:id', DoctorVerifyToken, getDoctorById)

doctorRoutes.post('/doctor-edit-profile/:id', DoctorVerifyToken, doctorEditController)
doctorRoutes.post('/doctor-register', upload.fields([
{ name: "profileImagePath", maxCount: 1 }, 
{ name: "certificateImagePath", maxCount: 1 }, 
{ name: "clinicImagesPath1", maxCount: 1 },
{ name: "clinicImagesPath2", maxCount: 1 },
{ name: "clinicImagesPath3", maxCount: 1 },


]), doctorRegistrationController)
doctorRoutes.get('/doctor-login', doctorLogin)
doctorRoutes.post('/doctor-register-d', generator)

doctorRoutes.post('/angular-doctor-login', doctorLogin)


export default doctorRoutes