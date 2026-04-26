import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const AIAppointmentTips = ({ doctorSpeciality }) => {
  const { backendUrl } = React.useContext(AppContext);
  const [suggestions, setSuggestions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const fetchSuggestions = async () => {
    if (!doctorSpeciality || isLoading) return;

    setIsLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/ai/appointment-suggestions`, {
        doctorSpeciality
      });

      if (data.success) {
        setSuggestions(data.suggestions);
      }
    } catch (error) {
      console.error('Suggestions error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showTips && !suggestions) {
      fetchSuggestions();
    }
  }, [showTips]);

  return (
    <div className="mb-6">
      <motion.button
        onClick={() => setShowTips(!showTips)}
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span className="font-semibold">Get AI Tips for Your Appointment</span>
          <svg className={`w-5 h-5 transition-transform ${showTips ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </motion.button>

      <AnimatePresence>
        {showTips && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 overflow-hidden"
          >
            <div className="p-5">
              {isLoading ? (
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  <span>Generating personalized tips...</span>
                </div>
              ) : suggestions ? (
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">AI-Powered Tips</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{suggestions}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-xs text-blue-700">
                      <span className="font-semibold">💡 Pro tip:</span> Bring your medical history, current medications, and a list of questions to make the most of your appointment.
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Click again to fetch AI suggestions</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAppointmentTips;
