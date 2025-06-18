import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol,backendUrl,token,getDoctorsData } = useContext(AppContext)
  const [docInfo, setDocInfo] = useState(null)

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const navigate = useNavigate()
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    if (!docInfo) return;  // Prevent execution if docInfo is null

    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        let endTime = new Date();
        endTime.setDate(today.getDate() + i);
        endTime.setHours(21, 0, 0, 0);

        if (today.getDate() === currentDate.getDate()) {
            currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
            currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
        } else {
            currentDate.setHours(10);
            currentDate.setMinutes(0);
        }

        let timeSlots = [];

        while (currentDate < endTime) {
            let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            let day = currentDate.getDate();
            let month = currentDate.getMonth() + 1;
            let year = currentDate.getFullYear();
            const slotDate = `${day}_${month}_${year}`;
            const slotTime = formattedTime;

            // Check if slots_booked exists
            const isSlotAvailable = docInfo?.slots_booked?.[slotDate]?.includes(slotTime) ? false : true;

            if (isSlotAvailable) {
                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime
                });
            }

            currentDate.setMinutes(currentDate.getMinutes() + 30);
        }
        setDocSlots(prev => [...prev, timeSlots]);
    }
};

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to Book the Apointment')
      return navigate('/login')
    }
    try {
      const date = docSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth()+1
      let year = date.getFullYear()

      const slotDate = day + "_"+ month + "_" + year 

      const { data } = await axios.post(backendUrl + "/api/user/book-appointment", {docId,slotDate,slotTime},{headers : {token}})

      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  return docInfo && (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Doctor Details Container */}
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mb-8">
        {docInfo ? (
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <img
                className="h-20 w-20 rounded-full object-cover shadow"
                src={docInfo.image}
                alt="Doctor"
              />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  {docInfo.name}
                  <img
                    className="ml-2 h-5 w-5"
                    src={assets.verified_icon}
                    alt="Verified"
                  />
                </h2>
                <p className="text-gray-600">{docInfo.degree} - {docInfo.speciality}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-800 text-sm font-medium mb-1">Experience</p>
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full">
                {docInfo.experience}
              </span>
            </div>

            {/* Doctor's About Section */}
            <div className="mt-4">
              <div className="flex items-center text-gray-700 font-semibold mb-2">
                <p className="mr-2">About</p>
                <img className="h-4 w-4" src={assets.info_icon} alt="Info" />
              </div>
              <p className="text-gray-600">{docInfo.about}</p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee: <span className="text-gray-600">{currencySymbol}{docInfo.fees}</span>
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading doctor information...</p>
        )}
      </div>

      {/* Booking Slot Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
        <p className="text-xl font-semibold text-gray-800 mb-4">Booking Slots</p>
        
        {/* Date Selection */}
        <div className="flex gap-4 overflow-x-scroll pb-4">
          {docSlots.length > 0 && docSlots.map((item, index) => (
            <div 
              key={index} 
              onClick={() => setSlotIndex(index)}
              className={`min-w-[80px] text-center py-3 rounded-lg cursor-pointer transition-colors ${slotIndex === index ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <p className="font-medium">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p className="text-sm">{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        {/* Time Slot Selection */}
        <div className="flex gap-3 overflow-x-scroll mt-4">
          {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
            <button
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`text-sm font-medium px-4 py-2 rounded-full cursor-pointer transition-colors ${item.time === slotTime ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 border border-gray-300'}`}
            >
              {item.time.toLowerCase()}
            </button>
          ))}
        </div>

        <button onClick={bookAppointment} className="bg-blue-500 text-white text-sm font-medium px-6 py-2 rounded-lg mt-6 hover:bg-blue-600 transition-colors w-full">
          Book an appointment
        </button>
      </div>

      {/* Related Doctors Section */}
      <div className="w-full max-w-2xl mt-8">
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    </div>
  )
}

export default Appointment
