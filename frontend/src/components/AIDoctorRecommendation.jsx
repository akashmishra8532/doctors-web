import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const AIDoctorRecommendation = () => {
  const { backendUrl, doctors } = React.useContext(AppContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [symptoms, setSymptoms] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  const handleGetRecommendation = async () => {
    if (!symptoms.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/ai/recommend-doctor`, {
        symptoms: symptoms
      });

      if (data.success) {
        setRecommendation(data.recommendedSpecialty);
      }
    } catch (error) {
      console.error('Recommendation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookWithRecommended = () => {
    if (recommendation) {
      navigate(`/doctors/${recommendation}`);
      setIsOpen(false);
    }
  };

  const recommendedDoctors = recommendation 
    ? doctors.filter(doc => doc.speciality.toLowerCase() === recommendation.toLowerCase())
    : [];

  return (
    <div className="mb-8">
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-center gap-3">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <span className="font-semibold">Not sure which doctor to see? Let AI help!</span>
        </div>
      </motion.button>

      {/* Expandable Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Powered Doctor Recommendation</h3>
              <p className="text-gray-600 mb-4">Describe your symptoms and our AI will recommend the right specialist for you.</p>
              
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="E.g., I have a persistent headache, feel dizzy, and sometimes experience blurred vision..."
                className="w-full p-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm resize-none h-32"
              />

              <motion.button
                onClick={handleGetRecommendation}
                disabled={isLoading || !symptoms.trim()}
                className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? 'Analyzing...' : 'Get Recommendation'}
              </motion.button>

              {/* Recommendation Result */}
              <AnimatePresence>
                {recommendation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 mb-1">Recommended Specialist</h4>
                        <p className="text-green-700 font-semibold text-lg mb-2">{recommendation}</p>
                        <p className="text-sm text-gray-600 mb-3">
                          Based on your symptoms, we recommend seeing a {recommendation}. 
                          {recommendedDoctors.length > 0 && ` We have ${recommendedDoctors.length} ${recommendation}(s) available.`}
                        </p>
                        {recommendedDoctors.length > 0 && (
                          <motion.button
                            onClick={handleBookWithRecommended}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            View {recommendation}s
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-xs text-gray-400 mt-4 text-center">
                This is an AI recommendation. Please consult with a healthcare professional for proper diagnosis.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIDoctorRecommendation;
