import jwt from "jsonwebtoken"

function UserVerifyToken(req,res,next){
    const token = req.header('user-token')
    // check if token is available 
    if(!token){
        res.status(401).json({
            message:"user token not found ,access denied"
        })
    }
    else{
        try{
            const verifiedToken = jwt.verify(token,process.env.USER_TOKEN_SECRET)

            req.user = verifiedToken 
            next()
        }catch(e){
            res.status(401).json({
                message:"invalid token"
            })
        }
    }
}

export default UserVerifyToken