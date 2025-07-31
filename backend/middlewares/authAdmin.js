import jwt from "jsonwebtoken"

// admin authentication middleware 
const authAdmin = async (req,res,next) =>{
    try {
        
        const {atoken}=req.headers
        if(!atoken){
            return res.json({success:false,message:"Not Authorized Login again"})
        }

        const token_decode=jwt.verify(atoken, process.env.JWT_SECRET || 'fallback_secret_key')
        if(token_decode.email !== process.env.ADMIN_EMAIL || token_decode.password !== process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"Not Authorized Login again"})
        }
        next()

    } catch (error) {
        console.log("JWT Verification Error:", error.message)
        return res.json({success:false,message:"Token expired or invalid. Please login again."})
    }
}

export default authAdmin