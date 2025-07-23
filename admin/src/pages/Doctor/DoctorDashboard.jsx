import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    setDashData,
    getDashData,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext)

  const { currency, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (dToken) getDashData()
  }, [dToken])

  return dashData && (
    <div className="m-5">
      {/* Dashboard Stats */}
      <div className="flex flex-wrap gap-4">
        {/* Card Template */}
        {[
          {
            icon: assets.earning_icon,
            label: 'Earnings',
            value: `${currency} ${dashData.earnings}`,
          },
          {
            icon: assets.appointments_icon,
            label: 'Appointments',
            value: dashData.appointments,
          },
          {
            icon: assets.patients_icon,
            label: 'Patients',
            value: dashData.patients,
          },
        ].map((card, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-white p-4 min-w-52 rounded-xl shadow-sm border hover:shadow-md transition-transform hover:scale-[1.03] cursor-pointer"
          >
            <img className="w-12" src={card.icon} alt={card.label} />
            <div>
              <p className="text-xl font-bold text-gray-700">{card.value}</p>
              <p className="text-gray-400 text-sm">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Bookings */}
      <div className="bg-white mt-10 rounded-lg overflow-hidden border shadow-sm">
        <div className="flex items-center gap-2 px-6 py-4 border-b bg-gray-50">
          <img src={assets.list_icon} alt="" className="w-5" />
          <p className="font-semibold text-gray-800">Latest Bookings</p>
        </div>

        <div className="divide-y">
          {dashData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className="flex items-center px-6 py-4 gap-4 hover:bg-gray-50 transition"
            >
              {/* Patient Image */}
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={item.userData.image}
                alt={item.userData.name}
              />

              {/* Patient Info */}
              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">{item.userData.name}</p>
                <p className="text-gray-500">{slotDateFormat(item.slotDate)}</p>
              </div>

              {/* Appointment Status or Action */}
              {item.cancelled ? (
                <p className="text-red-500 font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 font-medium">Completed</p>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => completeAppointment(item._id)}
                    className="flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition"
                    title="Mark as Completed"
                  >
                    <img src={assets.tick_icon} alt="Complete" className="w-4 h-4" />
                    Complete
                  </button>
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="flex items-center gap-1 px-3 py-1 text-sm rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                    title="Cancel Appointment"
                  >
                    <img src={assets.cancel_icon} alt="Cancel" className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
