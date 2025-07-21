import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <div className='flex flex-col items-center gap-6 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-semibold'>Top Doctors to Book</h1>
            <p className='sm:w-1/2 text-center text-sm text-gray-600'>
                Simply browse through our extensive list of trusted doctors.
            </p>

            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8 px-3 sm:px-0'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div
                        key={index}
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                        className='border border-blue-100 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 hover:shadow-lg bg-white'
                    >
                        <img className='w-full h-48 object-cover bg-blue-50' src={item.image} alt={item.name} />
                        
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-green-500 text-sm mb-2'>
                                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                                <p>Available</p>
                            </div>
                            <p className='text-gray-900 text-base font-semibold'>{item.name}</p>
                            <p className='text-gray-500 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button 
                onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
                className='bg-blue-50 hover:bg-blue-100 text-gray-700 px-12 py-3 rounded-full mt-10 transition shadow-md hover:shadow-lg'
            >
                View More
            </button>
        </div>
    )
}

export default TopDoctors
