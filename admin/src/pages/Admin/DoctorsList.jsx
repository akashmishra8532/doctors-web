import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/adminContext'

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className="m-5 max-h-[90vh] overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-5">👨‍⚕️ All Doctors</h1>
      <div className="w-full flex flex-wrap gap-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="group border border-gray-200 rounded-xl w-64 bg-white shadow-sm hover:shadow-indigo-100 transition-all duration-300"
          >
            <div className="w-full h-56 bg-indigo-50 flex items-center justify-center overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5">
              <p className="text-xl font-semibold text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500 mb-4">{item.speciality}</p>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={item.available}
                  onChange={() => changeAvailability(item._id)}
                />
                <div className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 
                  ${item.available ? 'bg-green-500' : 'bg-red-500'}`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 
                    ${item.available ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
                <span className={`text-sm font-medium 
                  ${item.available ? 'text-green-600' : 'text-red-600'}`}>
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
