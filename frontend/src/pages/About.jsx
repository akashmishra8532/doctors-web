import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt=''/>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to Prescripto, where we are dedicated to providing exceptional healthcare and personalized treatment for every patient. Our team of experienced doctors, nurses, and medical professionals is committed to offering compassionate and comprehensive care, ensuring each visit is comfortable, efficient, and tailored to your unique needs.</p>
          <p>From routine check-ups to specialized consultations, we prioritize your health and well-being with state-of-the-art facilities and modern medical practices. We believe in a proactive approach to health, empowering you with the knowledge and support needed for a healthier, happier life. Trust us to be your healthcare partner every step of the way.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our vision is to create a healthcare environment where every patient feels valued, heard, and cared for with compassion and expertise. We strive to lead in accessible, innovative, and holistic healthcare that empowers our community toward lasting well-being.</p>
        </div>
      </div>
        <div className='text-xl my-4'>
          <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
        </div>
        <div className='flex flex-col md:flex-row mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
              <b>EFFICIENCY:</b>
              <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
              <b>CONVENIENCE:</b>
              <p>Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
              <b>PERSONALIZATION:</b>
              <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
    </div>
  )
}

export default About