import jwt from "jsonwebtoken"

function SubAdminVerifyToken(req, res, next) {
    const token = req.header('sub-admin-token')
    // check if token is available 
    if (!token) {
        res.status(401).json({
            message: "sub-admin token not found ,access denied"
        })
    }
    else {
        try {
            const verifiedToken = jwt.verify(token, process.env.SUB_ADMIN_TOKEN)

            req.user = verifiedToken
            next()
        } catch (e) {
            res.status(401).json({
                message: "invalid token"
            })
        }
    }
}

export default SubAdminVerifyToken