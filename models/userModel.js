import mongoose from 'mongoose'

const UserModel = mongoose.Schema({
    userName:{
        type:String,
        required:true,
        minLength:3
    },
    userEmail:{
        type:String,
        required:true,
    },
    userPassword:{
        type:String,
        required:true,
        minLength:6 
    },
    userAge:{
        type:String,
        required:true,
    },
    userProfileImagePath:{
        type:String,
        default:''
    }
    ,userAppointments:{
        type:Array,
        default:[]
    },
    userAgeDesiease:{
        type:Array,
        default:[]
    },
    userLapAppointment:{
        type:Array,
        default:[]
    },
    phoneNumber:{
        type:String,
        require: true
    }
    
})

export default mongoose.model("users",UserModel)