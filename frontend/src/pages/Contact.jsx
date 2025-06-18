import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
        <div>
          <p className='text-center text-2xl pt-10 text-gray-500'>CONTACT<span className='text-gray-700  font-semibold'>US</span></p>
          <p></p>
        </div>
        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
          <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt=''/>
          <div className='flex flex-col justify-center items-start gap-6'>
            <p className='font-semibold text-lg text-gray-600'>Our Hospital</p>
            <p className='text-gray-500'>Gorakhpur, Uttar Pradesh ,<br/>Jai Baba ki</p>
            <p className='text-gray-500'>Tel: (415) 5534-3434<br/>Email: akashmishra@gmail.com</p>
            <p className='font-semibold text-lg text-gray-600'>CAREERS AT PRESCRIPTO</p>
            <p className='text-gray-500'>Learn more about our teams and job openings.</p>
            <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
          </div>
        </div>
    </div>
  )
}

export default Contact