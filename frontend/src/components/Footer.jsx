import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='bg-[#f9f9f9] text-gray-700 pt-16 pb-8 md:mx-10 rounded-t-xl'>

            <div className='flex flex-col md:grid grid-cols-[3fr_1fr_1fr] gap-14 md:gap-20 mb-10 px-6'>

                {/* Left Section */}
                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt='logo' />
                    <p className='md:w-2/3 text-sm leading-6 text-gray-600'>
                        A prescription, often abbreviated ℞ or Rx, is a formal communication from a healthcare professional to a pharmacist, authorizing them to dispense specific prescription drugs.
                    </p>
                </div>

                {/* Company Section */}
                <div>
                    <p className='text-xl font-semibold mb-5 text-gray-800'>Company</p>
                    <ul className='flex flex-col gap-2 text-gray-600 text-sm'>
                        <li className='hover:text-primary cursor-pointer transition'>Home</li>
                        <li className='hover:text-primary cursor-pointer transition'>About Us</li>
                        <li className='hover:text-primary cursor-pointer transition'>Contact Us</li>
                        <li className='hover:text-primary cursor-pointer transition'>Privacy Policy</li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div>
                    <p className='text-xl font-semibold mb-5 text-gray-800'>Get In Touch</p>
                    <ul className='flex flex-col gap-2 text-gray-600 text-sm'>
                        <li>📞 +91 9985895545</li>
                        <li>✉️ akashmishra@gmail.com</li>
                    </ul>
                </div>

            </div>

            <hr className='border-gray-300 my-5' />

            <p className='text-center text-sm text-gray-500'>
                © 2024 Prescription. All Rights Reserved.
            </p>

        </div>
    )
}

export default Footer
