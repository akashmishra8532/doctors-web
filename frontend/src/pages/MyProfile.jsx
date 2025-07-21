import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(null)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      if (image) formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(null)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return userData && (
    <div className='max-w-lg mx-auto p-6 bg-white shadow-lg rounded-xl flex flex-col gap-6 text-sm text-gray-700'>
      <div className="flex flex-col items-center">
        {isEdit ? (
          <label htmlFor='image'>
            <div className='relative cursor-pointer hover:opacity-80 transition-all'>
              <img
                className='w-36 h-36 object-cover rounded-full border-4 border-blue-300 shadow-md'
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile"
              />
              <img
                className='w-10 absolute bottom-2 right-2 bg-white rounded-full p-1 shadow'
                src={assets.upload_icon}
                alt="Upload"
              />
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type='file'
              id='image'
              accept="image/*"
              hidden
            />
          </label>
        ) : (
          <img
            className='w-36 h-36 object-cover rounded-full border-4 border-blue-300 shadow-md'
            src={userData.image}
            alt="Profile"
          />
        )}

        {isEdit ? (
          <input
            className='bg-gray-50 text-2xl font-semibold text-center mt-4 border-b-2 border-blue-400 focus:outline-none focus:border-blue-500 transition-all'
            type='text'
            value={userData.name}
            onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <p className='font-semibold text-2xl text-neutral-800 mt-4'>{userData.name}</p>
        )}
      </div>

      <hr className='border-t border-gray-300' />

      {/* Contact Information */}
      <div>
        <p className='text-gray-500 font-semibold underline mt-3 mb-2'>Contact Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-3'>
          <p className='font-semibold'>Email:</p>
          <p className='text-blue-600'>{userData.email}</p>

          <p className='font-semibold'>Phone:</p>
          {isEdit ? (
            <input
              className='bg-gray-100 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400'
              type='text'
              value={userData.phone}
              onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
            />
          ) : (
            <p className='text-blue-500'>{userData.phone}</p>
          )}

          <p className='font-semibold'>Address:</p>
          {isEdit ? (
            <div className='space-y-2'>
              <input
                className='bg-gray-50 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400'
                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                value={userData.address.line1}
                type="text"
                placeholder='Line 1'
              />
              <input
                className='bg-gray-50 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400'
                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                value={userData.address.line2}
                type="text"
                placeholder='Line 2'
              />
            </div>
          ) : (
            <p className='text-gray-500'>{userData.address.line1}<br />{userData.address.line2}</p>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div>
        <p className='text-gray-500 font-semibold underline mt-3 mb-2'>Basic Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-3'>
          <p className='font-semibold'>Gender:</p>
          {isEdit ? (
            <select
              className='bg-gray-100 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400'
              onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
              value={userData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className='text-gray-500'>{userData.gender}</p>
          )}

          <p className='font-semibold'>Birthday:</p>
          {isEdit ? (
            <input
              className='bg-gray-100 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400'
              type="date"
              onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
              value={userData.dob}
            />
          ) : (
            <p className='text-gray-500'>{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className='mt-8 text-center'>
        {isEdit ? (
          <button
            className='bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-full font-semibold hover:from-indigo-500 hover:to-blue-500 transition-all transform hover:scale-105'
            onClick={updateUserProfileData}
          >
            Save Information
          </button>
        ) : (
          <button
            className='bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-full font-semibold hover:from-indigo-500 hover:to-blue-500 transition-all transform hover:scale-105'
            onClick={() => setIsEdit(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  )
}

export default MyProfile
