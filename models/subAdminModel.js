import mongoose from 'mongoose'

const SubAdminModel = mongoose.Schema({
    subAdminName: {
        type: String,
        required: true,
        minLength: 3
    },
    subAdminEmail: {
        type: String,
        required: true,
    },
    subAdminPassword: {
        type: String,
        required: true,
        minLength: 6
    },

    subAdminProfileImagePath: {
        type: String,
        default: ''
    },


})

export default mongoose.model("sub-admins", SubAdminModel)