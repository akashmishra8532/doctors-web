import React, { useContext, useState, useEffect } from 'react'
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

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (showMenu) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
        return () => {
            document.body.classList.remove('menu-open');
        };
    }, [showMenu]);

    // Close mobile menu when clicking outside or pressing Escape
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showMenu && !event.target.closest('.mobile-menu-overlay')) {
                setShowMenu(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape' && showMenu) {
                setShowMenu(false);
            }
        };

        if (showMenu) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [showMenu]);

    return (
        <nav className='navbar-fixed flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 px-4 md:px-12 backdrop-blur-lg bg-white/30 shadow-md fixed top-0 left-0 right-0 z-50'>
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
                            <div className='absolute top-full right-0 mt-3 bg-white shadow-lg rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200 z-20 min-w-48'>
                                <div className='flex flex-col gap-1 p-4'>
                                    <div className='border-b pb-3 mb-2'>
                                        <p className='font-semibold text-gray-800 text-sm'>{userData.name}</p>
                                        <p className='text-xs text-gray-500'>{userData.email}</p>
                                    </div>
                                    <button 
                                        onClick={() => navigate('/my-profile')} 
                                        className='text-left px-3 py-2 rounded hover:bg-primary/10 transition text-sm text-gray-700 hover:text-primary'
                                    >
                                        My Profile
                                    </button>
                                    <button 
                                        onClick={() => navigate('/my-appointments')} 
                                        className='text-left px-3 py-2 rounded hover:bg-primary/10 transition text-sm text-gray-700 hover:text-primary'
                                    >
                                        My Appointments
                                    </button>
                                    <button 
                                        onClick={logout} 
                                        className='text-left px-3 py-2 rounded hover:bg-red-50 transition text-sm text-gray-700 hover:text-red-600'
                                    >
                                        Logout
                                    </button>
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
                <img 
                    onClick={() => setShowMenu(true)} 
                    className='w-7 md:hidden cursor-pointer' 
                    src={assets.menu_icon} 
                    alt="Menu" 
                    aria-label="Open menu"
                />
            </div>

            {/* Mobile Menu Overlay */}
            <div 
                className={`mobile-menu-overlay fixed top-0 right-0 w-full h-full bg-black/70 flex justify-end transition-all duration-300 ${showMenu ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
                style={{ zIndex: 60 }}
                aria-hidden={!showMenu}
                aria-modal="true"
                role="dialog"
            >
                <div className='bg-white w-4/5 max-w-sm h-full p-6 flex flex-col gap-6 text-lg text-gray-700 shadow-2xl relative overflow-y-auto'>
                    <img className='w-36' src={assets.logo} alt="Logo" />
                    <img 
                        className='w-6 absolute top-6 right-6 cursor-pointer' 
                        onClick={() => setShowMenu(false)} 
                        src={assets.cross_icon} 
                        alt="Close" 
                        aria-label="Close menu"
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
                        
                        {/* Mobile Login/Profile Section */}
                        <div className='border-t pt-4 mt-4'>
                            {token && userData ? (
                                <div className='space-y-3'>
                                    <div className='flex items-center gap-3 px-4 py-2'>
                                        <img className='w-10 h-10 rounded-full border-2 border-primary' src={userData.image} alt="Profile" />
                                        <div>
                                            <p className='font-semibold text-gray-800'>{userData.name}</p>
                                            <p className='text-sm text-gray-500'>{userData.email}</p>
                                        </div>
                                    </div>
                                    <NavLink 
                                        to="/my-profile" 
                                        onClick={() => setShowMenu(false)}
                                        className='block px-4 py-2 rounded hover:bg-primary/10 transition'
                                    >
                                        My Profile
                                    </NavLink>
                                    <NavLink 
                                        to="/my-appointments" 
                                        onClick={() => setShowMenu(false)}
                                        className='block px-4 py-2 rounded hover:bg-primary/10 transition'
                                    >
                                        My Appointments
                                    </NavLink>
                                    <button 
                                        onClick={() => {
                                            logout();
                                            setShowMenu(false);
                                        }}
                                        className='w-full text-left px-4 py-2 rounded hover:bg-red-50 text-red-600 transition'
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => {
                                        navigate('/login');
                                        setShowMenu(false);
                                    }}
                                    className='w-full bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-lg font-semibold transition'
                                >
                                    Login / Create Account
                                </button>
                            )}
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
