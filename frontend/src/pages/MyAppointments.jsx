import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/cancel-appointment", { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div className='max-w-4xl mx-auto p-6 md:p-10'>
      <p className='text-3xl font-bold text-gray-800 mb-8'>My Appointments</p>

      <div className='space-y-6'>
        {appointments.length === 0 ? (
          <div className='text-center text-gray-500 text-lg'>No appointments found.</div>
        ) : (
          appointments.map((item, index) => (
            <div
              key={index}
              className='flex flex-col md:flex-row items-center bg-white shadow-md hover:shadow-xl rounded-xl p-6 transition-all duration-300'
            >
              <img
                src={item.docData.image}
                alt={item.docData.name}
                className='w-24 h-24 rounded-full object-cover mb-4 md:mb-0 md:mr-6'
              />

              <div className='flex-1 text-center md:text-left'>
                <p className='text-xl font-semibold text-gray-800'>{item.docData.name}</p>
                <p className='text-sm text-gray-500 mb-3'>{item.docData.speciality}</p>

                <div className='text-sm text-gray-600 space-y-1'>
                  <p><span className='font-medium'>Address:</span> {item.docData.address.line1}, {item.docData.address.line2}</p>
                  <p><span className='font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                </div>
              </div>

              <div className='mt-4 md:mt-0 md:ml-6 flex flex-col space-y-2 w-full md:w-auto'>
                {!item.cancelled ? (
                  <>
                    <button
                      className='w-full md:w-40 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:from-indigo-500 hover:to-blue-500'
                    >
                      Pay Online
                    </button>
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className='w-full md:w-40 py-2 bg-red-500 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-red-600'
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <div className='w-full md:w-40 py-2 border border-red-500 text-red-500 rounded-lg font-medium text-center'>
                    Cancelled
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default MyAppointments
