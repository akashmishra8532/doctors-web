import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const navigate = useNavigate()
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const fetchDocInfo = () => {
    const doc = doctors.find(doc => doc._id === docId)
    setDocInfo(doc)
  }

  const getAvailableSlots = () => {
    if (!docInfo) return

    setDocSlots([])
    const today = new Date()

    let slots = []

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date()
      currentDate.setDate(today.getDate() + i)

      const endOfDay = new Date(currentDate)
      endOfDay.setHours(21, 0, 0, 0)

      if (i === 0) {
        currentDate.setHours(Math.max(today.getHours() + 1, 10))
        currentDate.setMinutes(today.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10, 0, 0, 0)
      }

      const daySlots = []
      while (currentDate < endOfDay) {
        const timeStr = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const dateKey = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`

        const isBooked = docInfo.slots_booked?.[dateKey]?.includes(timeStr)
        if (!isBooked) {
          daySlots.push({
            datetime: new Date(currentDate),
            time: timeStr
          })
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      slots.push(daySlots)
    }
    setDocSlots(slots)
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book the appointment')
      return navigate('/login')
    }

    try {
      const date = docSlots[slotIndex][0].datetime
      const dateKey = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate: dateKey, slotTime },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  return docInfo && (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Doctor Details */}
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl mb-10">
        <div className="flex items-center gap-6">
          <img src={docInfo.image} alt={docInfo.name} className="w-20 h-20 rounded-full object-cover shadow" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              {docInfo.name}
              <img src={assets.verified_icon} alt="verified" className="w-5 h-5" />
            </h2>
            <p className="text-gray-600 text-sm">{docInfo.degree} - {docInfo.speciality}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="font-medium text-gray-700">Experience</p>
          <span className="inline-block bg-blue-500 text-white text-xs px-3 py-1 rounded-full mt-1">
            {docInfo.experience}
          </span>

          <div className="mt-4">
            <div className="flex items-center font-semibold text-gray-700 mb-2">
              About <img src={assets.info_icon} className="w-4 h-4 ml-2" alt="info" />
            </div>
            <p className="text-gray-600 text-l">{docInfo.about}</p>
          </div>

          <p className="mt-4 text-gray-500 font-medium">
            Appointment Fee: <span className="text-gray-800">{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl">
        <p className="text-xl font-semibold text-gray-800 mb-5">Select a Slot</p>

        {/* Date Slots */}
        <div className="flex gap-5 overflow-x-auto pb-5">
          {docSlots.map((item, index) => (
            <button
              key={index}
              onClick={() => { setSlotIndex(index); setSlotTime('') }}
              className={`min-w-[90px] text-center py-4 px-4 rounded-xl text-base font-semibold transition-all 
                ${slotIndex === index ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <p>{item[0]?.datetime.getDate()}</p>
              <p className="text-sm">{daysOfWeek[item[0]?.datetime.getDay()]}</p>
            </button>
          ))}
        </div>

        {/* Time Slots */}
        <div className="flex gap-5 overflow-x-auto mt-5">
          {docSlots[slotIndex]?.map((item, index) => (
            <button
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`px-5 py-3 rounded-full text-base font-medium border transition-all
                ${item.time === slotTime ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {item.time.toLowerCase()}
            </button>
          ))}
        </div>

        {/* Book Button */}
        <button
          onClick={bookAppointment}
          disabled={!slotTime}
          className={`w-full mt-8 py-4 rounded-xl text-base font-semibold transition-all
            ${slotTime ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90 text-white shadow-lg' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          {slotTime ? 'Book Appointment' : 'Select Time to Book'}
        </button>
      </div>

      {/* Related Doctors */}
      <div className="w-full max-w-2xl mt-10">
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    </div>
  )
}

export default Appointment
