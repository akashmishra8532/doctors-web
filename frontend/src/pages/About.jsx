import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
    return (
        <div className='md:mx-10 px-4 sm:px-8'>

            {/* ---- Title ---- */}
            <div className='text-center text-3xl pt-12 text-gray-600 font-medium'>
                ABOUT <span className='text-gray-800 font-semibold'>US</span>
            </div>

            {/* ---- About Section ---- */}
            <div className='my-12 flex flex-col md:flex-row gap-12 items-center'>

                <img className='w-full md:max-w-[400px] rounded-xl shadow-md' src={assets.about_image} alt='About Us' />

                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-[15px] leading-relaxed text-gray-600'>

                    <p>
                        Welcome to <span className='font-semibold text-gray-800'>Prescripto</span>, where we are dedicated to providing exceptional healthcare and personalized treatment for every patient. Our experienced team is committed to compassionate and comprehensive care, ensuring each visit is comfortable, efficient, and tailored to your unique needs.
                    </p>

                    <p>
                        From routine check-ups to specialized consultations, we prioritize your health and well-being with state-of-the-art facilities and modern medical practices. We believe in proactive healthcare, empowering you with knowledge and support for a healthier life.
                    </p>

                    <div>
                        <h3 className='text-lg text-gray-800 font-semibold mb-2'>Our Vision</h3>
                        <p>
                            To create a healthcare environment where every patient feels valued, heard, and cared for with compassion and expertise. We strive to lead in accessible, innovative, and holistic healthcare that empowers our community toward lasting well-being.
                        </p>
                    </div>

                </div>

            </div>

            {/* ---- Why Choose Us ---- */}
            <div className='text-2xl font-semibold my-8 text-center text-gray-700'>
                WHY <span className='text-primary'>CHOOSE US</span>
            </div>

            <div className='flex flex-col md:flex-row gap-6 mb-20'>

                {[
                    { title: "EFFICIENCY", desc: "Streamlined appointment scheduling that fits into your busy lifestyle." },
                    { title: "CONVENIENCE", desc: "Access to a network of trusted healthcare professionals in your area." },
                    { title: "PERSONALIZATION", desc: "Tailored recommendations and reminders to help you stay on top of your health." }
                ].map((item, index) => (
                    <div
                        key={index}
                        className='flex-1 border border-gray-300 px-8 py-10 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 shadow-sm cursor-pointer'
                    >
                        <h4 className='text-lg font-bold mb-3'>{item.title}</h4>
                        <p className='text-sm leading-relaxed'>{item.desc}</p>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default About
