import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div>
            <div className='flex flex-col items-center gap-6 py-16 text-gray-800' id='speciality'>
                <h1 className='text-3xl font-semibold'>Find the Speciality</h1>
                <p className='sm:w-1/2 text-center text-sm text-gray-600'>
                    Simply browse through our extensive list of trusted doctors, and schedule your appointment hassle-free.
                </p>

                <div className='flex sm:justify-center gap-6 pt-8 w-full overflow-x-auto scrollbar-hide'>
                    {specialityData.map((item, index) => (
                        <Link
                            onClick={() => scrollTo(0, 0)}
                            key={index}
                            to={`/doctors/${item.speciality}`}
                            className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:-translate-y-2 hover:scale-105 transition-all duration-300 ease-in-out text-gray-700 hover:text-primary'
                        >
                            <img className='w-16 sm:w-24 mb-3 rounded-full shadow-md hover:shadow-lg transition' src={item.image} alt={item.speciality} />
                            <p className='font-medium'>{item.speciality}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SpecialityMenu;
