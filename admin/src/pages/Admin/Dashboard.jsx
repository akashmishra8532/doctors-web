import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) getDashData();
  }, [aToken]);

  return dashData && (
    <div className="p-6 lg:p-10 bg-gray-50 min-h-screen">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        
        <div className="flex items-center gap-4 bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-indigo-100 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
          <img className="w-14 h-14 object-contain" src={assets.doctor_icon} alt="Doctors" />
          <div>
            <p className="text-2xl font-bold text-indigo-600">{dashData.doctors}</p>
            <p className="text-gray-500 text-sm font-medium">Doctors</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-pink-100 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
          <img className="w-14 h-14 object-contain" src={assets.appointments_icon} alt="Appointments" />
          <div>
            <p className="text-2xl font-bold text-pink-500">{dashData.appointments}</p>
            <p className="text-gray-500 text-sm font-medium">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-green-100 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
          <img className="w-14 h-14 object-contain" src={assets.patients_icon} alt="Patients" />
          <div>
            <p className="text-2xl font-bold text-green-500">{dashData.patients}</p>
            <p className="text-gray-500 text-sm font-medium">Patients</p>
          </div>
        </div>

      </div>

      {/* Latest Bookings */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-5 border-b">
          <img src={assets.list_icon} alt="list" className="w-6 h-6" />
          <h2 className="text-lg font-semibold text-gray-800">Latest Bookings</h2>
        </div>
        <div className="divide-y">
          {dashData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className="flex items-center px-6 py-4 gap-4 hover:bg-gray-50 transition-all"
            >
              <img
                className="rounded-full w-12 h-12 object-cover border-2 border-indigo-200"
                src={item.docData.image}
                alt="Doctor"
              />
              <div className="flex-1">
                <p className="text-gray-900 font-medium text-sm">{item.docData.name}</p>
                <p className="text-gray-500 text-xs">{slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <span className="text-sm text-red-500 font-semibold">Cancelled</span>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-8 cursor-pointer hover:scale-110 transition-transform"
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
