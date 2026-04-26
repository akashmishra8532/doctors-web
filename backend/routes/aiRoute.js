import express from 'express'
import { 
  chatWithAI, 
  getDoctorRecommendations, 
  getSmartAppointmentSuggestions,
  analyzeSymptoms,
  getHealthTips,
  detectEmergency
} from '../controllers/aiController.js'

const aiRouter = express.Router()

// AI Chatbot endpoint (with mode support)
aiRouter.post('/chat', chatWithAI)

// Advanced Symptom Analysis endpoint
aiRouter.post('/analyze-symptoms', analyzeSymptoms)

// AI Doctor Recommendations endpoint
aiRouter.post('/recommend-doctor', getDoctorRecommendations)

// AI Smart Appointment Suggestions endpoint
aiRouter.post('/appointment-suggestions', getSmartAppointmentSuggestions)

// AI Health Tips endpoint
aiRouter.post('/health-tips', getHealthTips)

// Emergency Detection endpoint
aiRouter.post('/detect-emergency', detectEmergency)

export default aiRouter
