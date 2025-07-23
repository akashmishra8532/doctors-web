import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  const linkStyle = ({ isActive }) =>
    `group flex items-center gap-4 px-4 py-3 md:px-6 md:min-w-64 transition-all duration-300 rounded-r-full relative overflow-hidden
    ${isActive
      ? 'bg-gradient-to-r from-[#e6eaff] to-[#f5f7ff] border-r-[6px] border-[#5F6FFF] text-[#5F6FFF] font-semibold'
      : 'hover:bg-[#f9f9f9] text-gray-700 hover:text-[#5F6FFF]'}`
  
  return (
    <div className="min-h-screen bg-white border-r px-3 py-6 shadow-md">
      <ul className="space-y-1">

        {/* Admin Menu */}
        {aToken && (
          <>
            <NavLink to="/admin-dashboard" className={linkStyle}>
              <img
                src={assets.home_icon}
                alt="Dashboard"
                className="w-5 transition-transform duration-300 group-hover:scale-110"
              />
              <p className="hidden md:block">Dashboard</p>
            </NavLink>

            <NavLink to="/all-appointments" className={linkStyle}>
              <img
                src={assets.appointment_icon}
                alt="Appointments"
                className="w-5 transition-transform duration-300 group-hover:scale-110"
              />
              <p className="hidden md:block">Appointments</p>
            </NavLink>

            <NavLink to="/add-doctor" className={linkStyle}>
              <img
                src={assets.add_icon}
                alt="Add Doctor"
                className="w-5 transition-transform duration-300 group-hover:scale-110"
              />
              <p className="hidden md:block">Add Doctor</p>
            </NavLink>

            <NavLink to="/doctor-list" className={linkStyle}>
              <img
                src={assets.people_icon}
                alt="Doctors List"
                className="w-5 transition-transform duration-300 group-hover:scale-110"
              />
              <p className="hidden md:block">Doctors List</p>
            </NavLink>
          </>
        )}

        {/* Doctor Menu */}
        {dToken && (
          <>
            <NavLink to="/doctor-dashboard" className={linkStyle}>
              <img
                src={assets.home_icon}
                alt="Dashboard"
                className="w-5 transition-transform duration-300 group-hover:scale-110"
              />
              <p className="hidden md:block">Dashboard</p>
            </NavLink>

            <NavLink to="/doctor-appointments" className={linkStyle}>
              <img
                src={assets.appointment_icon}
                alt="Appointments"
                className="w-5 transition-transform duration-300 group-hover:scale-110"
              />
              <p className="hidden md:block">Appointments</p>
            </NavLink>

            <NavLink to="/doctor-profile" className={linkStyle}>
              <img
                src={assets.people_icon}
                alt="Profile"
                className="w-5 transition-transform duration-300 group-hover:scale-110"
              />
              <p className="hidden md:block">Profile</p>
            </NavLink>
          </>
        )}
      </ul>
    </div>
  )
}

export default Sidebar
