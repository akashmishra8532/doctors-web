import React, { useContext, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { Menu, X, Home, Users, Info, Mail, LogOut, LogIn, User, Calendar, LayoutDashboard, Search, Bell, Heart } from 'lucide-react'

const Navbar = () => {
  const navigate = useNavigate()
  const { token, setToken, userData } = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
  }

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = showMenu ? 'hidden' : 'auto'
    return () => (document.body.style.overflow = 'auto')
  }, [showMenu])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showMenu && !e.target.closest('.mobile-menu-panel')) {
        setShowMenu(false)
      }
      if (showNotifications && !e.target.closest('.notifications-panel')) {
        setShowNotifications(false)
      }
    }
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowMenu(false)
        setShowNotifications(false)
      }
    }
    if (showMenu || showNotifications) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [showMenu, showNotifications])

  const navItems = [
    { path: '/', name: 'Home', icon: Home },
    { path: '/doctors', name: 'Doctors', icon: Users },
    { path: '/about', name: 'About', icon: Info },
    { path: '/contact', name: 'Contact', icon: Mail }
  ]

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }

  const menuItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  }

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-2xl shadow-lg border-b border-indigo-100'
            : 'bg-white/70 backdrop-blur-xl shadow-md border-b border-white/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center py-3 md:py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="cursor-pointer flex-shrink-0"
          >
            <motion.img
              className="w-32 md:w-40 h-auto"
              src={assets.logo}
              alt="Prescripto"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item, i) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={i}
                  to={item.path}
                  className={({ isActive }) => `
                    relative px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2
                    ${isActive
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50/50'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden xl:inline">{item.name}</span>
                  {({ isActive }) => isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"
                    />
                  )}
                </NavLink>
              )
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {token && userData ? (
              <>
                {/* Notifications */}
                <motion.div className="relative hidden sm:block notifications-panel">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                    />
                  </motion.button>

                  {/* Notifications Dropdown */}
                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                      >
                        <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
                          <h3 className="font-semibold text-gray-900">Notifications</h3>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          <div className="p-4 space-y-3">
                            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 hover:border-blue-200 transition cursor-pointer">
                              <p className="text-sm font-medium text-gray-900">Appointment Reminder</p>
                              <p className="text-xs text-gray-600 mt-1">You have an appointment tomorrow</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg border border-green-100 hover:border-green-200 transition cursor-pointer">
                              <p className="text-sm font-medium text-gray-900">Health Tip</p>
                              <p className="text-xs text-gray-600 mt-1">Stay hydrated and exercise regularly</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Dashboard Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/health-dashboard')}
                  className="hidden md:flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden lg:inline">Dashboard</span>
                </motion.button>

                {/* Profile Dropdown */}
                <div className="relative group">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-indigo-600 cursor-pointer object-cover shadow-md hover:shadow-lg transition-all"
                    src={userData?.image}
                    alt="Profile"
                  />

                  {/* Profile Menu */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-3 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200 z-50 min-w-64 border border-gray-100"
                  >
                    {/* Profile Header */}
                    <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <motion.img
                          className="w-12 h-12 rounded-full border-2 border-indigo-600 object-cover"
                          src={userData?.image}
                          alt="Profile"
                        />
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{userData?.name}</p>
                          <p className="text-xs text-gray-600 truncate">{userData?.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2 space-y-1">
                      <motion.button
                        whileHover={{ x: 5 }}
                        onClick={() => navigate('/health-dashboard')}
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 text-sm font-medium transition-all flex items-center gap-3"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Health Dashboard
                      </motion.button>

                      <motion.button
                        whileHover={{ x: 5 }}
                        onClick={() => navigate('/my-profile')}
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 text-sm font-medium transition-all flex items-center gap-3"
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </motion.button>

                      <motion.button
                        whileHover={{ x: 5 }}
                        onClick={() => navigate('/my-appointments')}
                        className="w-full text-left px-4 py-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 text-sm font-medium transition-all flex items-center gap-3"
                      >
                        <Calendar className="w-4 h-4" />
                        My Appointments
                      </motion.button>

                      <div className="border-t border-gray-100 pt-2 mt-2">
                        <motion.button
                          whileHover={{ x: 5 }}
                          onClick={logout}
                          className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 text-sm font-medium transition-all flex items-center gap-3"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="hidden md:flex btn-primary text-sm gap-2 items-center"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden lg:inline">Sign In</span>
              </motion.button>
            )}

            {/* Mobile Menu Icon */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMenu(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          >
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ duration: 0.3 }}
              className="mobile-menu-panel fixed right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-2xl overflow-y-auto z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <motion.img
                  className="w-28 h-auto"
                  src={assets.logo}
                  alt="Prescripto"
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowMenu(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </motion.button>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <NavLink
                        to={item.path}
                        onClick={() => setShowMenu(false)}
                        className={({ isActive }) => `
                          flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all
                          ${
                            isActive
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                              : 'text-gray-700 hover:bg-gray-100'
                          }
                        `}
                      >
                        <Icon className="w-5 h-5" />
                        {item.name}
                      </NavLink>
                    </motion.div>
                  )
                })}
              </div>

              {/* User Section */}
              <div className="border-t border-gray-100 p-4 space-y-3">
                {token && userData ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                      <motion.img
                        className="w-10 h-10 rounded-full border-2 border-indigo-600 object-cover"
                        src={userData?.image}
                        alt="Profile"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm truncate">{userData?.name}</p>
                        <p className="text-xs text-gray-600 truncate">{userData?.email}</p>
                      </div>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        navigate('/health-dashboard')
                        setShowMenu(false)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 transition font-medium"
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      Health Dashboard
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        navigate('/my-profile')
                        setShowMenu(false)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 transition font-medium"
                    >
                      <User className="w-5 h-5" />
                      My Profile
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        navigate('/my-appointments')
                        setShowMenu(false)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 transition font-medium"
                    >
                      <Calendar className="w-5 h-5" />
                      My Appointments
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        logout()
                        setShowMenu(false)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition font-medium"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigate('/login')
                      setShowMenu(false)
                    }}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-5 h-5" />
                    Sign In / Register
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content being hidden under fixed navbar */}
      <div className="h-16 md:h-20" />
    </>
  )
}

export default Navbar

