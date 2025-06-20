import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData  } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData()
    }

  },[aToken])
  return dashData && (
    <div className='m-5'>
      <div>
        <div>
          <img src={assets.doctor_icon} alt="" />
          <div>
            <p>{dashData.doctors}</p>
            <p>Doctors</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard