import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate();
    const [showSymptomChecker, setShowSymptomChecker] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    return (
        <>
            <motion.div 
                className='flex flex-col md:flex-row flex-wrap bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl px-6 md:px-10 lg:px-20 shadow-2xl overflow-hidden relative'
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Animated Background Elements */}
                <div className='absolute -right-20 -top-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-blob' />
                <div className='absolute -left-20 -bottom-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-blob' style={{animationDelay: '2s'}} />

                {/* ------ Left Side ------ */}
                <motion.div 
                    className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-12 m-auto md:py-[8vw] md:mb-[-40px] relative z-10'
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.p 
                        className='text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-snug md:leading-snug lg:leading-snug'
                        variants={itemVariants}
                    >
                        Book Appointments <br /> 
                        <span className='bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent'>
                            With Trusted Doctors
                        </span>
                    </motion.p>

                    <motion.div 
                        className='flex flex-col md:flex-row items-center gap-4 text-white text-sm font-light'
                        variants={itemVariants}
                    >
                        <img className='w-28' src={assets.group_profiles} alt="Group" />
                        <p className='text-center md:text-left'>
                            Browse our extensive list of trusted doctors,<br className='hidden sm:block' />
                            and schedule appointments with AI-powered guidance.
                        </p>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div 
                        className='flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto'
                        variants={itemVariants}
                    >
                        <motion.button
                            onClick={() => document.getElementById('speciality')?.scrollIntoView({ behavior: 'smooth' })}
                            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                            whileTap={{ scale: 0.95 }}
                            className='flex items-center gap-3 bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 w-full sm:w-auto justify-center'
                        >
                            📅 Book Appointment
                            <svg className='w-4 h-4 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                            </svg>
                        </motion.button>

                        <motion.button
                            onClick={() => setShowSymptomChecker(!showSymptomChecker)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='flex items-center gap-3 bg-white/20 backdrop-blur-xl text-white px-8 py-3 rounded-full font-semibold border-2 border-white/30 hover:bg-white/30 transition-all duration-300 w-full sm:w-auto justify-center'
                        >
                            🩺 Check Symptoms
                        </motion.button>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div 
                        className='flex gap-8 text-white text-xs md:text-sm mt-4'
                        variants={itemVariants}
                    >
                        <div className='flex items-center gap-2'>
                            <span className='text-xl'>✅</span>
                            <span>500+ Doctors</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='text-xl'>⭐</span>
                            <span>4.8/5 Rated</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='text-xl'>🔒</span>
                            <span>100% Secure</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* ------ Right Side ------ */}
                <motion.div 
                    className='md:w-1/2 relative mt-6 md:mt-0 flex items-center justify-center'
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className='relative w-full'
                    >
                        <img 
                            className='w-full md:absolute bottom-0 h-auto rounded-2xl object-cover shadow-2xl' 
                            src={assets.header_img} 
                            alt="Doctor Consultation" 
                        />
                        {/* Glow Effect */}
                        <div className='absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent rounded-2xl' />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Quick Info Cards */}
            <motion.div 
                className='grid grid-cols-3 md:grid-cols-3 gap-4 mt-12'
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {[
                    { icon: '⏰', title: '24/7 Available', desc: 'Book anytime' },
                    { icon: '🏥', title: 'Multiple Specialties', desc: 'All specialists' },
                    { icon: '💳', title: 'Secure Payment', desc: 'Easy payment' }
                ].map((feature, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        className='card-modern p-4 md:p-6 text-center'
                    >
                        <div className='text-3xl md:text-4xl mb-2'>{feature.icon}</div>
                        <h3 className='font-bold text-gray-800 text-sm md:text-base mb-1'>{feature.title}</h3>
                        <p className='text-xs md:text-sm text-gray-600'>{feature.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </>
    )
}

export default Header
