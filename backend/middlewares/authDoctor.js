import jwt from "jsonwebtoken"

// Doctor authentication middleware 
const authDoctor = async (req,res,next) =>{
    try {
        
        const {dtoken}=req.headers
        if(!dtoken){
            return res.json({success:false,message:"Not Authorized Login again"})
        }

        const token_decode=jwt.verify(dtoken, process.env.JWT_SECRET || 'fallback_secret_key')
        req.body.docId = token_decode.id
        
        next()

    } catch (error) {
        console.log("JWT Verification Error:", error.message)
        return res.json({success:false,message:"Token expired or invalid. Please login again."})
    }
}

export default authDoctor