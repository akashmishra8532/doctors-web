import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const AdvancedSymptomChecker = () => {
  const { backendUrl, doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [duration, setDuration] = useState('');
  const [severity, setSeverity] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const commonSymptoms = [
    { id: 1, name: 'Headache', icon: '🤕' },
    { id: 2, name: 'Fever', icon: '🌡️' },
    { id: 3, name: 'Cough', icon: '🤐' },
    { id: 4, name: 'Throat Pain', icon: '😷' },
    { id: 5, name: 'Body Pain', icon: '💪' },
    { id: 6, name: 'Fatigue', icon: '😴' },
    { id: 7, name: 'Dizziness', icon: '🌀' },
    { id: 8, name: 'Stomach Ache', icon: '🤢' },
    { id: 9, name: 'Skin Issues', icon: '🩹' },
    { id: 10, name: 'Eye Problems', icon: '👁️' },
    { id: 11, name: 'Sleep Issues', icon: '😴' },
    { id: 12, name: 'Anxiety', icon: '😟' },
  ];

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev =>
      prev.some(s => s.id === symptom.id)
        ? prev.filter(s => s.id !== symptom.id)
        : [...prev, symptom]
    );
  };

  const handleGetDiagnosis = async () => {
    if (!selectedSymptoms.length || !duration || !severity) return;

    setIsLoading(true);
    try {
      const symptomsText = selectedSymptoms.map(s => s.name).join(', ');
      const { data } = await axios.post(`${backendUrl}/api/ai/analyze-symptoms`, {
        symptoms: symptomsText,
        duration: duration,
        severity: severity
      });

      if (data.success) {
        setResult(data);
        setStep(3);
      }
    } catch (error) {
      console.error('Diagnosis error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookAppointment = (specialty) => {
    navigate(`/doctors/${specialty.toLowerCase()}`);
  };

  const resetChecker = () => {
    setStep(1);
    setSelectedSymptoms([]);
    setDuration('');
    setSeverity('');
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-2">Smart Symptom Analyzer</h2>
        <p className="text-gray-600">Describe your symptoms and get AI-powered health insights</p>
      </motion.div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {[1, 2, 3].map((s) => (
            <motion.div
              key={s}
              className={`w-full h-2 mx-1 rounded-full ${
                s <= step ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-gray-200'
              }`}
              animate={{ scaleX: s <= step ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>Select Symptoms</span>
          <span>Provide Details</span>
          <span>Get Results</span>
        </div>
      </div>

      {/* Step 1: Symptom Selection */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="card-modern p-8"
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-800">What symptoms are you experiencing?</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {commonSymptoms.map((symptom) => (
                <motion.button
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                    selectedSymptoms.some(s => s.id === symptom.id)
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-lg shadow-purple-500/50'
                      : 'bg-white border-gray-200 text-gray-800 hover:border-indigo-400'
                  }`}
                >
                  <div className="text-2xl mb-2">{symptom.icon}</div>
                  <div className="text-sm font-medium">{symptom.name}</div>
                </motion.button>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                disabled={!selectedSymptoms.length}
                className="btn-primary flex-1 disabled:opacity-50"
              >
                Continue ({selectedSymptoms.length} selected)
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Additional Details */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="card-modern p-8"
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Tell us more about your symptoms</h3>

            {/* Duration */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">How long have you had these symptoms?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Less than 1 day', '1-3 days', '4-7 days', 'More than 1 week'].map((d) => (
                  <motion.button
                    key={d}
                    onClick={() => setDuration(d)}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      duration === d
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white border-gray-200 text-gray-700'
                    }`}
                  >
                    {d}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Severity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">How severe are your symptoms?</label>
              <div className="grid grid-cols-3 gap-3">
                {['Mild', 'Moderate', 'Severe'].map((s) => (
                  <motion.button
                    key={s}
                    onClick={() => setSeverity(s)}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      severity === s
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white border-gray-200 text-gray-700'
                    }`}
                  >
                    {s}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Selected Symptoms Summary */}
            <div className="mb-6 p-4 bg-indigo-50 rounded-xl">
              <p className="text-sm font-medium text-indigo-900">Selected: {selectedSymptoms.map(s => s.name).join(', ')}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="btn-secondary flex-1"
              >
                Back
              </button>
              <button
                onClick={handleGetDiagnosis}
                disabled={isLoading || !duration || !severity}
                className="btn-primary flex-1 disabled:opacity-50"
              >
                {isLoading ? 'Analyzing...' : 'Get Analysis'}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Results */}
        {step === 3 && result && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Main Result Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="card-modern p-8 bg-gradient-to-br from-white to-indigo-50"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="text-5xl">🩺</div>
                <div>
                  <h3 className="text-2xl font-bold gradient-text mb-2">Analysis Result</h3>
                  <p className="text-gray-600">Based on your symptoms</p>
                </div>
              </div>

              <div className="bg-white/50 p-6 rounded-2xl border border-gray-200 mb-6">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{result.analysis}</p>
              </div>

              {/* Recommended Specialties */}
              {result.recommendedSpecialties && result.recommendedSpecialties.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-800 mb-4">Recommended Specialists:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {result.recommendedSpecialties.map((specialty, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -5 }}
                        className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200"
                      >
                        <p className="font-semibold text-indigo-900 mb-2">{specialty}</p>
                        <button
                          onClick={() => handleBookAppointment(specialty)}
                          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          Find Doctors →
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Important Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded"
            >
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Important:</strong> This AI analysis is for informational purposes only. For serious symptoms or medical emergencies, please seek immediate medical attention or call emergency services.
              </p>
            </motion.div>

            <div className="flex gap-4">
              <button
                onClick={resetChecker}
                className="btn-secondary flex-1"
              >
                Check Other Symptoms
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedSymptomChecker;
