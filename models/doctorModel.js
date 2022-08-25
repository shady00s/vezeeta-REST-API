import mongoose from "mongoose";

const DoctorModel = mongoose.Schema({
    doctorName: {
        type: Object,
        require: true,
    },
    doctorEmail: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        minLength: 6
    },
    doctorGender: {
        type: String,
        require: true
    },
    doctorSpecialization: {
        type: Object,
        require: true,
    },

    doctorLocation: {
        type: String,
        require: true,
    },
    doctorClinics: {
        type: Array,

        default: []
    },
    doctorRating: {
        type: Number,
        default: 0
    },
    certificateImagePath: {
        type: String,
        required: true
    },
    profileImagePath: {
        type: String,
        required: true
    },
    clinicImagesPath: {
        type: Array,
        required: true
    },

    profileStatus: {
        type: String,
        default: "pending"
    },
    fees: {
        type: String,
        required: true
    },


    doctorPadges: {
        type: Array,
        default: []
    },
    clinicWaitingTime: {
        type: String,
        require: true
    },
    voting: {
        type: Number,
        default: 0
    },
    entity: {
        type: String,
        require: true
    },
    doctorTitle: {
        type: String,
        require: true
    },
    doctorAppointments: {
        type: Array
        , default: []
    }
}, {
    timestamps: true,

})

export default mongoose.model('doctors', DoctorModel)