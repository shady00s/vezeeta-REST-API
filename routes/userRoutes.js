
import { Router } from 'express';
import { userRegister, userLogin, userProfile, userEditProfile, userAddAppointment, userRemoveAppointment } from '../controllers/userController.js';
import { searchController } from '../controllers/reusableControllers/userSearchController.js';
import { getDoctorById } from '../controllers/doctorControllers.js';
import UserVerifyToken from '../verifications/userVerification.js';
const UserRoutes = Router()
import upload from '../utils/multer.js';



UserRoutes.post('/user-register', upload.single('userProfileImagePath'), userRegister)
UserRoutes.post('/user-login', userLogin)
UserRoutes.get('/user-doctor-search', searchController)



UserRoutes.get('/user-profile/:id', UserVerifyToken, userProfile)
UserRoutes.get('/user-doctor-profile/:id', getDoctorById)
UserRoutes.post('/user-edit-profile/:id', upload.single('userProfileImagePath'), UserVerifyToken, userEditProfile)
UserRoutes.post('/user-add-appointment/:id', UserVerifyToken, userAddAppointment)
UserRoutes.post('/user-remove-appointment/:id', UserVerifyToken, userRemoveAppointment)

export default UserRoutes