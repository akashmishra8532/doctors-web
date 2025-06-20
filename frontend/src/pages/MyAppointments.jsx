import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyAppointments = () => {
  const { backendUrl, token , getDoctorsData} = useContext(AppContext)

  const [appointments, setAppointments] = useState([])

  const months = ["","Jan", "Feb", "Mar", "Apr", "May","Jun","Jul", "Aug", "Sep", "Oct","Nov", "Dec"]
  
  const slotDateFormat = (slotDate)=>{
    const dateArray = slotDate.split('_')
    return dateArray[0]+" "+months[Number(dateArray[1])] + " "+dateArray[2]

  }
  //const navigate = useNavigate()

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)

      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) =>{
    try {


      const {data} = await axios.post(backendUrl + "/api/user/cancel-appointment",{appointmentId},{headers:{token}})
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      }else{
        toast.error(data.message)

      }


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }




  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <p className='text-2xl font-semibold text-gray-800 mb-6'>My Appointments</p>
      <div className='space-y-6'>
        {appointments.map((item, index) => (
          <div key={index} className='flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-5 md:p-6 space-y-4 md:space-y-0 md:space-x-6'>
            <div className='flex-shrink-0'>
              <img className='w-24 h-24 rounded-full object-cover' src={item.docData.image} alt={item.name} />
            </div>
            <div className='flex-grow'>
              <p className='text-xl font-semibold text-gray-800'>{item.docData.name}</p>
              <p className='text-sm text-gray-500'>{item.docData.speciality}</p>
              <p className='mt-2 font-medium text-gray-600'>Address:</p>
              <p className='text-sm text-gray-500'>{item.docData.address.line1}</p>
              <p className='text-sm text-gray-500'>{item.docData.address.line2}</p>
              <p className='mt-2 text-sm text-gray-500'><span className='font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
            <div className='flex flex-col space-y-2'>
              {!item.cancelled && <button className='bg-blue-500 text-white py-2 px-4 rounded-full font-medium hover:bg-blue-800 transition duration-200'>Pay Online</button>}
              {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className='bg-red-500 text-white py-2 px-4 rounded-full font-medium hover:bg-red-600 transition duration-200'>Cancel Appointment</button>}
              {item.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
