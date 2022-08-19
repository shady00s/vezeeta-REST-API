
import mongoose from 'mongoose'

const AdminModel = mongoose.Schema({
    adminName: {
        type: String,
        required: true,
        minlength: 6
    }, adminEmail: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profileImagePath: {
        type: String,
        default: ""
    },



})

export default mongoose.model('admins', AdminModel)