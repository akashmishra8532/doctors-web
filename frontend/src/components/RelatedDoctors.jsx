import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docId }) => {

    const { doctors } = useContext(AppContext)
    const navigate = useNavigate()

    const [relDoc, setRelDocs] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDocs(doctorsData)
        }
    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-6 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-semibold'>Related Doctors</h1>
            <p className='sm:w-1/2 text-center text-sm text-gray-600'>
                Browse similar trusted doctors in {speciality}.
            </p>

            {
                relDoc.length > 0 ? (
                    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pt-8 px-3 sm:px-0'>
                        {relDoc.slice(0, 5).map((item, index) => (
                            <div
                                onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                                className='border border-blue-100 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 hover:shadow-lg bg-white'
                                key={index}
                            >
                                <img className='w-full h-40 object-cover bg-blue-50' src={item.image} alt={item.name} />

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
                ) : (
                    <p className='text-sm text-gray-500 mt-6'>No related doctors available right now.</p>
                )
            }

            <button
                onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
                className='bg-blue-50 hover:bg-blue-100 text-gray-700 px-10 py-2 rounded-full mt-10 transition shadow-md hover:shadow-lg text-sm'
            >
                View All Doctors
            </button>
        </div>
    )
}

export default RelatedDoctors
