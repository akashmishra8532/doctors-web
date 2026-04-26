import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const AIAppointmentTipsEnhanced = ({ doctorSpeciality }) => {
  const { backendUrl } = useContext(AppContext);
  const [tips, setTips] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedTip, setExpandedTip] = useState(0);

  useEffect(() => {
    const fetchTips = async () => {
      if (!doctorSpeciality) {
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await axios.post(`${backendUrl}/api/ai/appointment-suggestions`, {
          doctorSpeciality: doctorSpeciality
        });

        if (data.success) {
          setTips(data.suggestions);
        }
      } catch (error) {
        console.error('Tips fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTips();
  }, [doctorSpeciality, backendUrl]);

  const defaultTips = [
    {
      icon: '📝',
      title: 'Prepare Medical History',
      description: 'Bring previous medical records and list of current medications'
    },
    {
      icon: '❓',
      title: 'List Your Questions',
      description: 'Write down symptoms and questions before your appointment'
    },
    {
      icon: '⏰',
      title: 'Arrive Early',
      description: 'Come 10-15 minutes early to complete any necessary paperwork'
    },
    {
      icon: '🏥',
      title: 'Bring Insurance',
      description: 'Have your insurance card and ID ready for the appointment'
    }
  ];

  const appointmentTips = tips ? JSON.parse(JSON.stringify(tips)) : defaultTips;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-modern p-8 my-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="text-4xl">🤖</div>
        <div>
          <h3 className="text-2xl font-bold gradient-text">AI Appointment Preparation</h3>
          <p className="text-gray-600 text-sm">Personalized tips to make your appointment successful</p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-gray-200 border-t-indigo-600 rounded-full" />
          <p className="text-gray-600 mt-4">Loading personalized tips...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {appointmentTips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setExpandedTip(expandedTip === index ? -1 : index)}
              className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200 cursor-pointer transition-all hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0">{tip.icon || '💡'}</span>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 mb-2">{tip.title || tip}</h4>
                  <p className="text-gray-700 text-sm">{tip.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded"
      >
        <p className="text-sm text-yellow-800">
          <strong>💡 Pro Tip:</strong> Save all your appointment confirmations and bring them along with any relevant test reports.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AIAppointmentTipsEnhanced;
