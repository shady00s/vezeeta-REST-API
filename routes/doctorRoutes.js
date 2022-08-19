import { Router } from 'express';
import { doctorsByLocationAndSpecalizationController, doctorRegistrationController, getDoctorById, doctorEditController, doctorLogin } from '../controllers/doctorControllers.js';
import DoctorVerifyToken from '../verifications/doctorVerfication.js';
const doctorRoutes = Router()

import upload from '../utils/multer.js';




doctorRoutes.get('/doctors', doctorsByLocationAndSpecalizationController)

doctorRoutes.get('/doctor-profile/:id', DoctorVerifyToken, getDoctorById)

doctorRoutes.put('/doctor-edit-profile/:id', DoctorVerifyToken, doctorEditController)
doctorRoutes.put('/doctor-register', upload.fields([{ name: "profileImagePath", maxCount: 1 }, { name: "certificateImagePath", maxCount: 1 }, { name: "clinicImagesPath", maxCount: 3 }]), doctorRegistrationController)
doctorRoutes.get('/doctor-login', doctorLogin)


export default doctorRoutes