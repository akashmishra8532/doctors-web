import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    document.body.style.overflow = showMenu ? 'hidden' : 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [showMenu]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showMenu && !e.target.closest('.mobile-menu-panel')) {
        setShowMenu(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') setShowMenu(false);
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
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex justify-between items-center py-4">
          <img
            onClick={() => navigate('/')}
            className="w-36 md:w-40 cursor-pointer hover:scale-105 transition-transform duration-200"
            src={assets.logo}
            alt="Logo"
          />
          <ul className="hidden md:flex items-center gap-8 font-semibold text-gray-700">
            {['/', '/doctors', '/about', '/contact'].map((path, i) => {
              const names = ['HOME', 'ALL DOCTORS', 'ABOUT', 'CONTACT'];
              return (
                <NavLink
                  key={i}
                  to={path}
                  className={({ isActive }) =>
                    `relative px-2 py-1 hover:text-primary transition 
                    ${isActive ? 'text-primary after:absolute after:content-[""] after:h-[2px] after:bg-primary after:w-full after:bottom-0 after:left-0' : ''}`
                  }
                >
                  {names[i]}
                </NavLink>
              );
            })}
          </ul>

          <div className="flex items-center gap-4">
            {token && userData ? (
              <div className="relative group cursor-pointer">
                <img className="w-9 rounded-full border-2 border-primary" src={userData.image} alt="Profile" />
                <img className="w-3 ml-1 transition-transform group-hover:rotate-180" src={assets.dropdown_icon} alt="Dropdown" />
                <div className="absolute top-full right-0 mt-3 bg-white shadow-lg rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200 z-50 min-w-48">
                  <div className="p-4 flex flex-col gap-1">
                    <div className="border-b pb-3 mb-2 text-sm text-gray-800">
                      <p className="font-semibold">{userData.name}</p>
                      <p className="text-xs text-gray-500">{userData.email}</p>
                    </div>
                    <button onClick={() => navigate('/my-profile')} className="text-left px-3 py-2 rounded hover:bg-primary/10 text-gray-700 hover:text-primary text-sm">
                      My Profile
                    </button>
                    <button onClick={() => navigate('/my-appointments')} className="text-left px-3 py-2 rounded hover:bg-primary/10 text-gray-700 hover:text-primary text-sm">
                      My Appointments
                    </button>
                    <button onClick={logout} className="text-left px-3 py-2 rounded hover:bg-red-50 text-gray-700 hover:text-red-600 text-sm">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button onClick={() => navigate('/login')} className="hidden md:block bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full shadow-md transition">
                Create Account
              </button>
            )}
            <img onClick={() => setShowMenu(true)} className="w-7 md:hidden cursor-pointer" src={assets.menu_icon} alt="Menu" />
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="fixed inset-0 bg-black/70 z-[60] flex justify-end transition-opacity duration-300">
          <div className="mobile-menu-panel bg-white w-4/5 max-w-sm h-full p-6 flex flex-col gap-6 text-gray-700 relative overflow-y-auto shadow-2xl">
            <img className="w-36" src={assets.logo} alt="Logo" />
            <img className="w-6 absolute top-6 right-6 cursor-pointer" onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="Close" />
            <ul className="flex flex-col gap-4 mt-10">
              {['/', '/doctors', '/about', '/contact'].map((path, i) => {
                const names = ['Home', 'All Doctors', 'About', 'Contact'];
                return (
                  <NavLink
                    key={i}
                    to={path}
                    onClick={() => setShowMenu(false)}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded hover:bg-primary/10 transition ${isActive ? 'text-primary font-semibold' : ''}`
                    }
                  >
                    {names[i]}
                  </NavLink>
                );
              })}
            </ul>
            <div className="border-t pt-4 mt-4">
              {token && userData ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <img className="w-10 h-10 rounded-full border-2 border-primary" src={userData.image} alt="Profile" />
                    <div>
                      <p className="font-semibold text-gray-800">{userData.name}</p>
                      <p className="text-sm text-gray-500">{userData.email}</p>
                    </div>
                  </div>
                  <NavLink to="/my-profile" onClick={() => setShowMenu(false)} className="block px-4 py-2 rounded hover:bg-primary/10 transition">
                    My Profile
                  </NavLink>
                  <NavLink to="/my-appointments" onClick={() => setShowMenu(false)} className="block px-4 py-2 rounded hover:bg-primary/10 transition">
                    My Appointments
                  </NavLink>
                  <button
                    onClick={() => {
                      logout();
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 rounded hover:bg-red-50 text-red-600 transition"
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
                  className="w-full bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-lg font-semibold transition"
                >
                  Login / Create Account
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Spacer to prevent content being hidden under fixed navbar */}
      <div className="h-[80px] md:h-[85px]"></div>
    </>
  );
};

export default Navbar;
