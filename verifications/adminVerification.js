import jwt from "jsonwebtoken"

function AdminVerifyToken(req,res,next){
    const token = req.header('admin-token')
    // check if token is available 
    if(!token){
        res.status(401).json({
            message:"admin token not found ,access denied"
        })
    }
    else{
        try{
            const verifiedToken = jwt.verify(token,process.env.ADMIN_TOKEN_SECRET)

            req.doctor = verifiedToken 
            next()
        }catch(e){
            res.status(401).json({
                message:"invalid token"
            })
        }
    }
}

export default AdminVerifyToken