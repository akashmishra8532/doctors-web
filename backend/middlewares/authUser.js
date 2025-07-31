import jwt from "jsonwebtoken"

// user authentication middleware 
const authUser = async (req,res,next) =>{
    try {
        
        const {token}=req.headers
        if(!token){
            return res.json({success:false,message:"Not Authorized Login again"})
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key')

        req.body.userId = token_decode.id
        
        next()

    } catch (error) {
        console.log("JWT Verification Error:", error.message)
        return res.json({success:false,message:"Token expired or invalid. Please login again."})
    }
}

export default authUser