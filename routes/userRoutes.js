
import { Router } from 'express';
import { userRegister, userLogin, userEditProfileOrAddAppointment, userProfile } from '../controllers/userController.js';
import { searchController } from '../controllers/reusableControllers/userSearchController.js';
import { getDoctorById } from '../controllers/doctorControllers.js';
import UserVerifyToken from '../verifications/userVerification.js';
const UserRoutes = Router()
import upload from '../utils/multer.js';



UserRoutes.put('/user-register', upload.single('userProfileImagePath'), userRegister)
UserRoutes.get('/user-login', userLogin)
UserRoutes.get('/user-doctor-search', searchController)



UserRoutes.get('/user-profile/:id', UserVerifyToken, userProfile)
UserRoutes.get('/user-doctor-profile/:id', getDoctorById)
UserRoutes.put('/user-edit-profile/:id', upload.single('userProfileImagePath'), UserVerifyToken, userEditProfileOrAddAppointment)
UserRoutes.put('/user-add-appointemt/:id', UserVerifyToken, userEditProfileOrAddAppointment)

export default UserRoutes