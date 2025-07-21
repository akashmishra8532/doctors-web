import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
    return (
        <div className='md:mx-10 px-4 sm:px-8'>

            {/* ---- Title ---- */}
            <div className='text-center text-3xl pt-12 text-gray-600 font-medium'>
                CONTACT <span className='text-gray-800 font-semibold'>US</span>
            </div>

            {/* ---- Contact Info ---- */}
            <div className='my-12 flex flex-col md:flex-row gap-12 items-center mb-28'>

                <img className='w-full md:max-w-[400px] rounded-xl shadow-md' src={assets.contact_image} alt='Contact Us' />

                <div className='flex flex-col justify-center items-start gap-6 text-gray-600 text-[15px]'>

                    <div>
                        <h3 className='text-lg font-semibold mb-2'>Our Hospital</h3>
                        <p className='text-gray-500 leading-relaxed'>
                            Gorakhpur, Uttar Pradesh <br />
                            Jai Baba Ki
                        </p>
                    </div>

                    <div>
                        <p className='text-gray-500'>
                            Tel: (415) 5534-3434 <br />
                            Email: akashmishra@gmail.com
                        </p>
                    </div>

                    <div>
                        <h3 className='text-lg font-semibold mb-2 mt-4'>Careers at Prescripto</h3>
                        <p className='text-gray-500 mb-4'>
                            Learn more about our teams and job openings.
                        </p>

                        <button className='border border-primary text-primary px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-sm'>
                            Explore Jobs
                        </button>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Contact
