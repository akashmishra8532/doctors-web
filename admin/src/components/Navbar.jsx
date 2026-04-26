import React, { useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { useNavigate } from 'react-router-dom'
import { LogOut, Menu, X, Bell, User, Settings } from 'lucide-react'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const logout = () => {
    navigate('/')

    if (aToken) {
      setAToken('')
      localStorage.removeItem('aToken')
    }

    if (dToken) {
      setDToken('')
      localStorage.removeItem('dToken')
    }
  }

  const userRole = aToken ? 'Admin' : dToken ? 'Doctor' : 'User'

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-lg border-b border-indigo-100"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center py-3">
          {/* Logo Section */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3"
          >
            <img
              className="w-32 md:w-40 cursor-pointer"
              src={assets.admin_logo}
              alt="Prescripto Admin"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="hidden md:block px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200"
            >
              <span className="text-xs font-bold text-indigo-700">{userRole}</span>
            </motion.div>
          </motion.div>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <Bell className="w-5 h-5" />
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
              />
            </motion.button>

            {/* Settings */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </motion.button>

            {/* Profile Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-indigo-50 transition-colors"
              >
                <User className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-medium text-gray-700">{userRole}</span>
              </motion.button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                  >
                    <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">Account</p>
                      <p className="text-xs text-gray-600 mt-1">{userRole} Portal</p>
                    </div>
                    <div className="p-3 space-y-1">
                      <motion.button
                        whileHover={{ x: 5 }}
                        onClick={() => setShowDropdown(false)}
                        className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 text-sm font-medium transition-all flex items-center gap-3"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </motion.button>

                      <div className="border-t border-gray-100 pt-2 mt-2">
                        <motion.button
                          whileHover={{ x: 5 }}
                          onClick={() => {
                            logout()
                            setShowDropdown(false)
                          }}
                          className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 text-sm font-medium transition-all flex items-center gap-3"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Logout Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm px-6 py-2 rounded-full font-semibold hover:shadow-lg shadow-indigo-500/50 transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden lg:inline">Logout</span>
            </motion.button>
          </div>

          {/* Mobile Menu Icon */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          >
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="fixed right-0 top-0 h-full w-3/4 max-w-sm bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <div className="px-2 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200">
                  <span className="text-xs font-bold text-indigo-700">{userRole}</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="flex-1 p-4 space-y-3">
                <motion.button
                  whileHover={{ x: 5 }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 text-sm font-medium transition-all flex items-center gap-3"
                >
                  <Bell className="w-5 h-5" />
                  Notifications
                </motion.button>

                <motion.button
                  whileHover={{ x: 5 }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 text-sm font-medium transition-all flex items-center gap-3"
                >
                  <Settings className="w-5 h-5" />
                  Settings
                </motion.button>
              </div>

              <div className="border-t border-gray-100 p-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    logout()
                    setShowMobileMenu(false)
                  }}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16" />
    </>
  )
}

export default Navbar
