import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };
      const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`, updateData, {
        headers: { dToken },
      });

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return profileData && (
    <div className="p-5 flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6">
        {/* Profile Image */}
        <div>
          <img
            className="bg-[#5f6FFF]/80 w-48 sm:w-64 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            src={profileData.image}
            alt="Doctor"
          />
        </div>

        {/* Profile Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
          {/* Name & Degree */}
          <p className="text-3xl font-semibold text-gray-800 mb-1">{profileData.name}</p>
          <div className="flex flex-wrap items-center gap-2 text-gray-600 mb-4">
            <p>{profileData.degree} - {profileData.speciality}</p>
            <span className="px-2 py-0.5 text-xs border rounded-full">{profileData.experience}</span>
          </div>

          {/* About */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700">About:</p>
            <p className="text-sm text-gray-600 mt-1">{profileData.about}</p>
          </div>

          {/* Fees */}
          <div className="mb-3">
            <label className="font-medium text-gray-700">Appointment Fee:</label>
            <div className="mt-1">
              {isEdit ? (
                <input
                  type="number"
                  value={profileData.fees}
                  onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                  className="border px-3 py-1 rounded-md w-24 outline-none focus:border-blue-500"
                />
              ) : (
                <span className="text-gray-800 ml-2">{currency} {profileData.fees}</span>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="font-medium text-gray-700">Address:</label>
            <div className="text-sm text-gray-600 mt-1 space-y-1">
              {isEdit ? (
                <>
                  <input
                    type="text"
                    value={profileData.address.line1}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value }
                    }))}
                    className="w-full border px-3 py-1 rounded-md outline-none focus:border-blue-500"
                    placeholder="Line 1"
                  />
                  <input
                    type="text"
                    value={profileData.address.line2}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value }
                    }))}
                    className="w-full border px-3 py-1 rounded-md outline-none focus:border-blue-500"
                    placeholder="Line 2"
                  />
                </>
              ) : (
                <>
                  <p>{profileData.address.line1}</p>
                  <p>{profileData.address.line2}</p>
                </>
              )}
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={profileData.available}
              onChange={() =>
                isEdit &&
                setProfileData(prev => ({ ...prev, available: !prev.available }))
              }
              className="accent-blue-600"
            />
            <label className="text-sm">Available</label>
          </div>

          {/* Action Buttons */}
          <div className="mt-5">
            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-4 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-all text-sm"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-2 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all text-sm"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
