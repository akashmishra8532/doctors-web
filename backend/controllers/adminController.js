import validator from "validator";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";



//Api for adding doctor 
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        //checking for all data 
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "missing Details" })
        }

        //validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid Email" })

        }
        //validate Strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a Strong password" })
        }
        //hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"}) 
        const imageUrl = imageUpload.secure_url
        const doctorData={
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()

        }
        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true,message:"doctor added"})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})

    }
}

/// api for admin login
const loginAdmin=async(req,res)=>{
    try {
        
        const {email,password} = req.body
        
        if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign({ email, password }, process.env.JWT_SECRET || 'fallback_secret_key', { expiresIn: '7d' })
            res.json({success:true,token})

        }else{
            res.json({success:false,message:"Invalid Credentials"})
        }


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
//api to get all doctor list for admin pannel
const allDoctors = async(req,res)=>{
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}
//api to get all appointments  list
const appointmentsAdmin = async(req,res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}   
//api for appointment cancellation by admin

const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        // // Verify appointment user
        // if (!appointmentData) {
        //     return res.json({ success: false, message: 'Appointment not found' });
        // }

        // if (appointmentData.userId.toString() !== userId) {
        //     return res.json({ success: false, message: 'Unauthorized action' });
        // }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // Releasing doctor slot
        const { docId, slotDate, slotTime } = appointmentData;
        const doctorData = await doctorModel.findById(docId);

        if (!doctorData) {
            return res.json({ success: false, message: 'Doctor not found' });
        }

        let slots_booked = doctorData.slots_booked || {};

        // Ensure slotDate exists in slots_booked
        if (slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);

            if (slots_booked[slotDate].length === 0) {
                delete slots_booked[slotDate];
            }

            await doctorModel.findByIdAndUpdate(docId, { slots_booked });
        }

        res.json({ success: true, message: 'Appointment Cancelled' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
//api to get dashboard details for  admin pannel

const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData ={
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }
        res.json({ success: true, dashData }); 
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


export { addDoctor,loginAdmin,allDoctors ,appointmentsAdmin,appointmentCancel, adminDashboard }