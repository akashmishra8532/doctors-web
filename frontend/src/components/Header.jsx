import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-2xl px-6 md:px-10 lg:px-20 shadow-xl overflow-hidden'>

            {/* ------ Left Side ------ */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-12 m-auto md:py-[8vw] md:mb-[-40px]'>
                <p className='text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-snug md:leading-snug lg:leading-snug'>
                    Book Appointments <br /> With Trusted Doctors
                </p>

                <div className='flex flex-col md:flex-row items-center gap-4 text-white text-sm font-light'>
                    <img className='w-28' src={assets.group_profiles} alt="Group" />
                    <p className='text-center md:text-left'>
                        Browse our extensive list of trusted doctors,<br className='hidden sm:block' />
                        and schedule appointments hassle-free.
                    </p>
                </div>

                <a href='#speciality' className='flex items-center gap-3 bg-white px-8 py-3 rounded-full text-gray-700 text-sm m-auto md:m-0 font-medium shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300'>
                    Book Appointment
                    <img className='w-4 transition-transform group-hover:translate-x-1' src={assets.arrow_icon} alt="Arrow" />
                </a>
            </div>

            {/* ------ Right Side ------ */}
            <div className='md:w-1/2 relative mt-6 md:mt-0'>
                <img 
                    className='w-full md:absolute bottom-0 h-auto rounded-xl object-cover animate-float' 
                    src={assets.header_img} 
                    alt="Doctor Consultation" 
                />
            </div>

        </div>
    )
}

export default Header
