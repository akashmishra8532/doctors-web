import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const EnhancedDoctorCard = ({ doctor, index }) => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  const handleBooking = () => {
    navigate(`/appointment/${doctor._id}`);
  };

  // Mock data - in real app, calculate from reviews
  const rating = 4.8;
  const reviewCount = 145;
  const availability = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const experience = Math.floor(Math.random() * 20) + 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -10 }}
      className="card-modern overflow-hidden cursor-pointer h-full"
      onClick={() => setShowDetails(!showDetails)}
    >
      {/* Doctor Image */}
      <div className="relative overflow-hidden h-64 bg-gradient-to-br from-indigo-100 to-purple-100">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          ⭐ {rating}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <p className="text-white text-xs">{experience}+ years experience</p>
        </div>
      </div>

      {/* Doctor Info */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{doctor.name}</h3>
        <p className="text-indigo-600 font-medium text-sm mb-3">{doctor.speciality}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(rating) ? '⭐' : '☆'} />
            ))}
          </div>
          <span className="text-xs text-gray-600">({reviewCount} reviews)</span>
        </div>

        {/* Availability */}
        <div className="mb-4">
          <p className="text-xs text-gray-600 font-medium mb-2">Available:</p>
          <div className="flex flex-wrap gap-2">
            {availability.map((day) => (
              <span key={day} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full font-medium">
                {day}
              </span>
            ))}
          </div>
        </div>

        {/* Details Toggle */}
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-3 bg-indigo-50 rounded-lg text-sm text-gray-700 space-y-2"
          >
            <p>📍 {doctor.speciality} Specialist</p>
            <p>💼 Experience: {experience}+ years</p>
            <p>👥 Patient satisfaction: {rating}/5</p>
          </motion.div>
        )}

        {/* Booking Button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            handleBooking();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full btn-primary"
        >
          Book Appointment
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EnhancedDoctorCard;
