import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { token, setToken, userData } = useContext(AppContext)
    const [showMenu, setShowMenu] = useState(false);

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
    }

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 px-4 md:px-12 backdrop-blur-lg bg-white/30 shadow-md fixed top-0 left-0 right-0 z-30'>
            <img onClick={() => navigate('/')} className='w-40 cursor-pointer hover:scale-105 transition' src={assets.logo} alt='Logo' />

            <ul className='hidden md:flex items-center gap-8 font-semibold text-gray-700'>
                {['/', '/doctors', '/about', '/contact'].map((path, idx) => {
                    const names = ['HOME', 'ALL DOCTORS', 'ABOUT', 'CONTACT'];
                    return (
                        <NavLink 
                            key={idx} 
                            to={path}
                            className={({ isActive }) => 
                                `relative px-2 py-1 hover:text-primary transition 
                                ${isActive ? 'text-primary after:absolute after:content-[""] after:h-[2px] after:bg-primary after:w-full after:bottom-0 after:left-0' : ''}`
                            }
                        >
                            {names[idx]}
                        </NavLink>
                    )
                })}
            </ul>

            <div className='flex items-center gap-4'>
                {
                    token && userData ? (
                        <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img className='w-9 rounded-full border-2 border-primary hover:scale-105 transition' src={userData.image} alt="Profile" />
                            <img className='w-3 transition group-hover:rotate-180' src={assets.dropdown_icon} alt="Dropdown" />
                            
                            <div className='absolute top-full right-0 mt-3 bg-white shadow-lg rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200 z-20'>
                                <div className='flex flex-col gap-3 px-5 py-4 text-sm text-gray-700'>
                                    <p onClick={() => navigate('/my-profile')} className='hover:text-primary cursor-pointer'>My Profile</p>
                                    <p onClick={() => navigate('/my-appointments')} className='hover:text-primary cursor-pointer'>My Appointments</p>
                                    <p onClick={logout} className='hover:text-red-500 cursor-pointer'>Logout</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button 
                            onClick={() => navigate('/login')} 
                            className='bg-primary hover:bg-primary/90 text-white px-8 py-2.5 rounded-full shadow-md transition hidden md:block'
                        >
                            Create Account
                        </button>
                    )
                }

                <img onClick={() => setShowMenu(true)} className='w-7 md:hidden cursor-pointer' src={assets.menu_icon} alt="Menu" />
            </div>

            {/* Mobile Menu */}
            <div className={`fixed top-0 right-0 w-full h-full bg-black/70 z-40 flex justify-end transition-all ${showMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className='bg-white w-4/5 max-w-sm h-full p-6 flex flex-col gap-6 text-lg text-gray-700 shadow-2xl relative'>
                    <img className='w-36' src={assets.logo} alt="Logo" />
                    <img 
                        className='w-6 absolute top-6 right-6 cursor-pointer' 
                        onClick={() => setShowMenu(false)} 
                        src={assets.cross_icon} 
                        alt="Close" 
                    />

                    <ul className='flex flex-col gap-4 mt-10'>
                        {['/', '/doctors', '/about', '/contact'].map((path, idx) => {
                            const names = ['Home', 'All Doctors', 'About', 'Contact'];
                            return (
                                <NavLink 
                                    key={idx} 
                                    to={path} 
                                    onClick={() => setShowMenu(false)}
                                    className={({ isActive }) => 
                                        `px-4 py-2 rounded hover:bg-primary/10 transition ${isActive ? 'text-primary font-semibold' : ''}`
                                    }
                                >
                                    {names[idx]}
                                </NavLink>
                            )
                        })}
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Navbar
