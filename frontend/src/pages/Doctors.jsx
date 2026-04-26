import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import AIDoctorRecommendation from '../components/AIDoctorRecommendation'

const Doctors = () => {
  const { speciality } = useParams()
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()

  const [currentDoctors, setCurrentDoctors] = useState([])

  const filterOptions = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ]

  useEffect(() => {
    if (speciality) {
      setCurrentDoctors(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setCurrentDoctors(doctors)
    }
  }, [doctors, speciality])

  return (
    <div className='px-4 md:px-10 my-10'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-3'>Browse trusted doctors by speciality.</h2>
      
      {/* AI Doctor Recommendation */}
      <AIDoctorRecommendation />

      {/* Filters Pills + Clear Filter */}
      <div className='flex flex-wrap gap-3 mt-4 mb-8 justify-center sm:justify-start'>

        {filterOptions.map((item, idx) => (
          <button
            key={idx}
            onClick={() => navigate(`/doctors/${item}`)}
            className={`px-5 py-2 rounded-full border text-sm transition-all duration-300 
              ${speciality === item ? 'bg-primary text-white' : 'bg-white hover:bg-indigo-50 text-gray-700'}`}
          >
            {item}
          </button>
        ))}

        {speciality && (
          <button
            onClick={() => navigate('/doctors')}
            className='px-5 py-2 rounded-full border border-red-300 text-sm text-red-500 bg-white hover:bg-red-50 transition-all duration-300'
          >
            Clear Filter
          </button>
        )}

      </div>

      {/* Doctor Cards */}
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5'>
        {currentDoctors.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300 bg-white'
          >
            <img className='w-full h-48 object-cover bg-blue-50' src={item.image} alt={item.name} />
            <div className='p-4'>
              <div className='flex items-center gap-2 text-green-500 text-xs mb-1'>
                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                <p>Available</p>
              </div>
              <p className='text-gray-900 text-sm font-semibold'>{item.name}</p>
              <p className='text-gray-500 text-xs'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Doctors
