import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            
            {/* --------Left section ---------- */}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt=''/>
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>A prescription, often abbreviated ℞ or Rx, is a formal communication from a physician or other registered healthcare professional to a pharmacist, authorizing them to dispense a specific prescription drug for a specific patient</p>
                
            </div>


            {/* --------Middle section ---------- */}
            <div>
                <p className='text-xl font-semibold mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600 '>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>


            {/* --------Right section ---------- */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91 9935687707</li>
                    <li>akashmishra@gmail.com</li>
                </ul>
            </div>


        </div>
        {/* ----------- Copyright Text  -------------*/}
        <div>
            <hr/>
            <p className='py-5 text-sm text-center'>Copyright 2024@ Prescription All Right Reserved.</p>

        </div>
    </div>
  )
}

export default Footer