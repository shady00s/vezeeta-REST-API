import jwt from "jsonwebtoken"

function DoctorVerifyToken(req,res,next){
    const token = req.header('doctor-token')
    // check if token is available 
    if(!token){
        res.status(401).json({
            message:"doctor token not found ,access denied"
        })
    }
    else{
        try{
            const verifiedToken = jwt.verify(token,process.env.DOCTOR_TOKEN_SECRET)

            req.doctor = verifiedToken 
            next()
        }catch(e){
            res.status(401).json({
                message:"invalid token"
            })
        }
    }
}

export default DoctorVerifyToken