import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { LayoutDashboard, Calendar, Plus, Users, Home, Clock, User } from 'lucide-react'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  const adminMenuItems = [
    {
      path: '/admin-dashboard',
      name: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      path: '/all-appointments',
      name: 'Appointments',
      icon: Calendar
    },
    {
      path: '/add-doctor',
      name: 'Add Doctor',
      icon: Plus
    },
    {
      path: '/doctor-list',
      name: 'Doctors List',
      icon: Users
    }
  ]

  const doctorMenuItems = [
    {
      path: '/doctor-dashboard',
      name: 'Dashboard',
      icon: Home
    },
    {
      path: '/doctor-appointments',
      name: 'Appointments',
      icon: Clock
    },
    {
      path: '/doctor-profile',
      name: 'Profile',
      icon: User
    }
  ]

  const menuItems = aToken ? adminMenuItems : doctorMenuItems
  const menuVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  }

  return (
    <motion.div
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-indigo-50 border-r border-indigo-100 sticky top-0"
    >
      <ul className="text-gray-700 mt-6 space-y-1 px-3">
        {menuItems.map((item, i) => {
          const Icon = item.icon
          return (
            <motion.li
              key={i}
              custom={i}
              variants={menuVariants}
              initial="hidden"
              animate="visible"
            >
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-4 py-3.5 px-4 rounded-xl transition-all duration-300 md:min-w-max cursor-pointer group ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50'
                      : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                  }`
                }
                to={item.path}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <p className="hidden md:block font-medium">{item.name}</p>
                
                {/* Tooltip for mobile */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 5 }}
                  className="absolute left-16 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm pointer-events-none md:hidden whitespace-nowrap z-50"
                >
                  {item.name}
                </motion.div>
              </NavLink>
            </motion.li>
          )
        })}
      </ul>

      {/* Decorative elements */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="hidden lg:block absolute bottom-20 right-10 w-20 h-20 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full opacity-30 blur-2xl"
      />
    </motion.div>
  )
}

export default Sidebar
