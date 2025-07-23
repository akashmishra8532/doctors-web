import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/adminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const {aToken,setAToken,dToken,setDToken} = useContext(AdminContext)
    const navigate = useNavigate()
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
    

    
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-4 border-b bg-white shadow-sm'>
        <div className='flex items-center gap-2 text-xs sm:text-sm'>
            <img className='w-32 sm:w-40 cursor-pointer transition-transform duration-200 hover:scale-105' src={assets.admin_logo} alt='logo'/>
            <p className='border px-3 py-1 rounded-full border-gray-400 text-gray-700 font-medium'>{aToken ? 'Admin' : 'Doctor'}</p>
        </div>
        <button 
            onClick={logout} 
            className='bg-gradient-to-r from-[#5F6FFF] to-[#788BFF] text-white text-sm px-6 py-2 sm:px-10 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105'>
            Logout
        </button>
    </div>
  )
}

export default Navbar