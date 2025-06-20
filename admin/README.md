# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

==============================login form =======================================================================
<form className="min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-[#6A5AE0] via-[#8673FF] to-[#B3A4FF] relative overflow-hidden">
  
  {/* Background Effects */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15)_0%,_rgba(0,0,0,0)_60%)]"></div>
  
  {/* Glowing Animation */}
  <div className="absolute w-40 h-40 bg-white/20 blur-3xl rounded-full top-20 left-10 animate-pulse"></div>
  <div className="absolute w-32 h-32 bg-white/10 blur-2xl rounded-full bottom-20 right-10 animate-pulse"></div>

  <div className="relative flex flex-col gap-5 p-8 min-w-[340px] sm:min-w-96 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl text-[#444] text-sm">
    <p className="text-3xl font-bold text-center text-white drop-shadow-lg">
      {state} Login
    </p>

    <div className="w-full">
      <p className="font-medium text-white">Email</p>
      <input 
        className="border border-white/50 bg-white/20 text-white rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
        type="email" 
        required
      />
    </div>

    <div className="w-full">
      <p className="font-medium text-white">Password</p>
      <input 
        className="border border-white/50 bg-white/20 text-white rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
        type="password" 
        required
      />
    </div>

    <button 
      className="bg-white text-[#5F6FFF] hover:bg-[#E5E5FF] transition-all duration-200 w-full py-2 rounded-lg text-base font-medium shadow-md"
    >
      Login
    </button>
  </div>
</form>
==========================================================================================================


use navigate hook


==========================================================================================================
import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/adminContext';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-2xl font-semibold text-gray-800 border-b-2 pb-2 mb-5'>
        🩺 All Doctors
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {doctors.map((item, index) => (
          <div key={index} className='bg-white p-4 shadow-lg rounded-2xl flex flex-col items-center border hover:shadow-xl transition'>
            <img src={item.image} alt='' className='w-24 h-24 rounded-full object-cover border-2 border-gray-300' />
            <div className='text-center mt-3'>
              <p className='text-lg font-semibold text-gray-700'>{item.name}</p>
              <p className='text-sm text-gray-500'>{item.speciality}</p>
              <div className='flex items-center justify-center mt-2'>
                <input type='checkbox' checked={item.available} className='h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500' />
                <p className='text-sm text-gray-600 ml-2'>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;

======>appContext.jsx add this line if needed to see am and pm in time slot
const slotTimeFormat = (time) => {
        if (!time) return "N/A";
      
        const [hourStr, minuteStr] = time.split(":");
        let hour = parseInt(hourStr);
        const minute = parseInt(minuteStr);
      
        if (isNaN(hour) || isNaN(minute)) return "Invalid time";
      
        const ampm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12; // convert to 12-hour format
        return `${hour}:${minuteStr} ${ampm}`;
      }




