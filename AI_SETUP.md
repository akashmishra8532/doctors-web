# AI Integration Setup Guide

This project now includes powerful AI features powered by OpenAI. Follow these steps to set up the AI functionality.

## Prerequisites

1. **OpenAI API Key**: You need an OpenAI API key to use the AI features.
   - Sign up at [https://platform.openai.com/signup](https://platform.openai.com/signup)
   - Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - Create a new API key
   - Copy the key (you'll need it in the next step)

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Open the `.env` file and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_actual_api_key_here
   ```

3. The OpenAI package has already been installed. If you need to reinstall:
   ```bash
   npm install openai
   ```

4. Start the backend server:
   ```bash
   npm run server
   ```

## AI Features

### 1. AI Health Chatbot 💬
- **Location**: Floating chat widget in the bottom-right corner
- **Features**:
  - Answer general health questions
  - Provide symptom guidance
  - Suggest appropriate medical specialties
  - Help with appointment booking questions
- **API Endpoint**: `POST /api/ai/chat`

### 2. AI Doctor Recommendations 🤖
- **Location**: Doctors page (/doctors)
- **Features**:
  - Describe your symptoms
  - AI recommends the appropriate medical specialty
  - Direct link to filtered doctor list
- **API Endpoint**: `POST /api/ai/recommend-doctor`

### 3. Smart Appointment Tips 📋
- **Location**: Appointment booking page
- **Features**:
  - AI-powered tips for appointment preparation
  - Best times to book based on specialty
  - What to bring to your appointment
- **API Endpoint**: `POST /api/ai/appointment-suggestions`

## API Details

### Chat Endpoint
```javascript
POST /api/ai/chat
Body: {
  "message": "I have a headache and feel dizzy",
  "conversationHistory": [] // Optional
}
Response: {
  "success": true,
  "response": "Based on your symptoms..."
}
```

### Doctor Recommendation Endpoint
```javascript
POST /api/ai/recommend-doctor
Body: {
  "symptoms": "persistent headache, dizziness, blurred vision"
}
Response: {
  "success": true,
  "recommendedSpecialty": "Neurologist"
}
```

### Appointment Tips Endpoint
```javascript
POST /api/ai/appointment-suggestions
Body: {
  "doctorSpeciality": "Neurologist"
}
Response: {
  "success": true,
  "suggestions": "For neurology appointments..."
}
```

## Cost Considerations

The AI features use OpenAI's GPT-3.5-turbo model, which is cost-effective:
- Chat: ~$0.002 per 1K tokens
- Recommendations: ~$0.0005 per request
- Tips: ~$0.0005 per request

Typical usage for a small application: $1-5/month

## Troubleshooting

### AI features not working:
1. Check that `OPENAI_API_KEY` is set in backend `.env`
2. Verify the API key is valid and has credits
3. Check backend server logs for errors
4. Ensure the backend is running on the correct port

### Rate limiting:
- OpenAI has rate limits. If you hit limits, consider:
  - Adding request queuing
  - Implementing caching
  - Upgrading your OpenAI plan

## Security Notes

- Never commit your API key to version control
- The `.env` file is already in `.gitignore`
- Consider using environment variables in production
- Implement rate limiting on your API endpoints

## Future Enhancements

Potential AI features to add:
- Medical document analysis
- Symptom checker with severity assessment
- Personalized health recommendations
- Appointment reminder customization
- Doctor-patient communication assistance
