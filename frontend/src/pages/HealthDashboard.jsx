import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const HealthDashboard = () => {
  const navigate = useNavigate();
  const { token, userData, appointments } = useContext(AppContext);

  if (!token) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Please login to view your health dashboard</p>
        <button onClick={() => navigate('/login')} className="btn-primary">
          Go to Login
        </button>
      </div>
    );
  }

  const userAppointments = appointments?.filter(apt => apt.userId === userData?._id) || [];
  const upcomingAppointments = userAppointments.filter(apt => new Date(apt.slotDate) > new Date());
  const completedAppointments = userAppointments.filter(apt => new Date(apt.slotDate) <= new Date());

  const healthMetrics = [
    { label: 'Appointments', value: userAppointments.length, icon: '📅', color: 'from-blue-500 to-cyan-500' },
    { label: 'Upcoming', value: upcomingAppointments.length, icon: '🔔', color: 'from-indigo-500 to-purple-500' },
    { label: 'Completed', value: completedAppointments.length, icon: '✅', color: 'from-green-500 to-emerald-500' },
    { label: 'Health Score', value: '87%', icon: '⭐', color: 'from-pink-500 to-rose-500' },
  ];

  return (
    <div className="min-h-screen py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Your Health Dashboard</h1>
        <p className="text-xl text-gray-600">Track your health journey with Prescripto AI</p>
      </motion.div>

      {/* Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {healthMetrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="card-modern p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">{metric.label}</p>
                <p className="text-3xl font-bold gradient-text">{metric.value}</p>
              </div>
              <div className={`text-3xl p-3 bg-gradient-to-r ${metric.color} rounded-lg`}>
                {metric.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/doctors')}
          className="card-modern p-6 text-left hover:shadow-2xl"
        >
          <div className="text-4xl mb-3">👨‍⚕️</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Find a Doctor</h3>
          <p className="text-gray-600 text-sm">Browse specialists and book appointments</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/my-appointments')}
          className="card-modern p-6 text-left hover:shadow-2xl"
        >
          <div className="text-4xl mb-3">📋</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">My Appointments</h3>
          <p className="text-gray-600 text-sm">View and manage your appointments</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('/my-profile')}
          className="card-modern p-6 text-left hover:shadow-2xl"
        >
          <div className="text-4xl mb-3">👤</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">My Profile</h3>
          <p className="text-gray-600 text-sm">Update your health information</p>
        </motion.button>
      </motion.div>

      {/* Upcoming Appointments */}
      {upcomingAppointments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card-modern p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📅 Upcoming Appointments</h2>
          <div className="space-y-4">
            {upcomingAppointments.slice(0, 3).map((apt, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 5 }}
                className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800">{apt.docData?.name || 'Dr. Name'}</p>
                    <p className="text-sm text-gray-600">{apt.docData?.speciality}</p>
                  </div>
                  <span className="text-sm font-medium text-indigo-600 bg-white px-3 py-1 rounded-full">
                    {new Date(apt.slotDate).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Health Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card-modern p-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">💡 AI Health Tips</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { tip: '💧 Stay hydrated - Drink at least 8 glasses of water daily', color: 'from-blue-50 to-cyan-50' },
            { tip: '😴 Get quality sleep - Aim for 7-9 hours of sleep each night', color: 'from-purple-50 to-pink-50' },
            { tip: '🏃 Stay active - Exercise for at least 30 minutes daily', color: 'from-green-50 to-emerald-50' },
            { tip: '🥗 Eat healthy - Include more fruits and vegetables in your diet', color: 'from-orange-50 to-yellow-50' },
          ].map((item, index) => (
            <div
              key={index}
              className={`p-4 bg-gradient-to-br ${item.color} rounded-xl border border-gray-200`}
            >
              <p className="text-gray-800 font-medium">{item.tip}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HealthDashboard;
