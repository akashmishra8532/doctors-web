import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) getAllAppointments()
  }, [aToken])

  return (
    <div className="w-full max-w-6xl mx-auto my-5 p-4">
      <h2 className="text-xl font-semibold mb-4">All Appointments</h2>

      <div className="bg-white border rounded shadow-sm text-sm max-h-[80vh] overflow-y-auto">
        {/* Table header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1fr] py-3 px-6 border-b bg-gray-50 font-medium text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Appointments List */}
        {appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:grid sm:grid-cols-[0.5fr_2.5fr_1fr_2.5fr_2.5fr_1fr_1fr] items-center gap-3 text-gray-600 py-4 px-6 border-b hover:bg-gray-50 transition"
            >
              <p className="hidden sm:block">{index + 1}</p>

              {/* Patient */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <img src={item.userData.image} alt="" className="w-8 h-8 rounded-full object-cover" />
                <p>{item.userData.name}</p>
              </div>

              {/* Age */}
              <p className="hidden sm:block">{calculateAge(item.userData.dob)}</p>

              {/* Date & Time */}
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

              {/* Doctor */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <img src={item.docData.image} alt="" className="w-8 h-8 rounded-full bg-gray-200 object-cover" />
                <p>{item.docData.name}</p>
              </div>

              {/* Fees */}
              <p>{currency}{item.amount}</p>

              {/* Action */}
              {item.cancelled ? (
                <p className="text-red-500 font-medium">Cancelled</p>
              ) : (
                <img
                  src={assets.cancel_icon}
                  alt="Cancel"
                  className="w-6 sm:w-8 cursor-pointer hover:scale-110 transition"
                  onClick={() => cancelAppointment(item._id)}
                  title="Cancel Appointment"
                />
              )}
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">No appointments found.</div>
        )}
      </div>
    </div>
  )
}

export default AllAppointments
