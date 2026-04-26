import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// AI Chatbot for Medical Assistance with Mode-based Responses
export const chatWithAI = async (req, res) => {
  try {
    const { message, conversationHistory = [], mode = 'general' } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    // Mode-specific system prompts
    const systemPrompts = {
      general: `You are Dr. AI, a friendly and professional medical assistant for Prescripto. 
      - Provide general health information and guidance
      - Help users understand symptoms and when to see a doctor
      - Recommend appropriate medical specialties
      - Be empathetic, encouraging, and supportive
      - Always disclaimer that you're not a doctor
      Keep responses concise (<150 words), friendly, and include relevant emojis.`,
      
      medication: `You are a medication information assistant.
      - Explain common medications in simple terms
      - Discuss general medication uses
      - Note when to consult with healthcare professionals
      - Mention common side effects without being alarming
      - NEVER prescribe medications
      Keep responses informative and clear.`,
      
      symptoms: `You are a symptom analysis assistant.
      - Analyze reported symptoms carefully
      - Suggest likely medical specialties
      - Provide triage guidance
      - Recommend when to seek emergency care
      - Maintain professionalism and empathy
      Keep responses clear and actionable.`,
      
      wellness: `You are a wellness coach.
      - Provide health tips and lifestyle advice
      - Suggest preventive health measures
      - Discuss nutrition and exercise
      - Encourage healthy habits
      - Support mental wellness
      Be motivating and practical.`
    };

    const systemPrompt = systemPrompts[mode] || systemPrompts.general;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 250,
      temperature: 0.7
    });

    const aiResponse = completion.choices[0].message.content;

    res.json({
      success: true,
      response: aiResponse
    });

  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get AI response',
      error: error.message 
    });
  }
};

// Advanced Symptom Analysis with Detailed Recommendations
export const analyzeSymptoms = async (req, res) => {
  try {
    const { symptoms, duration, severity } = req.body;

    if (!symptoms) {
      return res.status(400).json({ success: false, message: 'Symptoms are required' });
    }

    const systemPrompt = `You are an advanced medical triage AI. Analyze symptoms and provide:
    1. Possible conditions (in general terms)
    2. Urgency level (Low/Moderate/High)
    3. Recommended action steps
    4. When to seek emergency care
    
    Format your response as clear sections with emojis for emphasis.
    Always include a disclaimer that this is not a diagnosis.`;

    const userPrompt = `Symptoms: ${symptoms}\nDuration: ${duration}\nSeverity: ${severity}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 400,
      temperature: 0.5
    });

    const analysis = completion.choices[0].message.content;

    // Get recommended specialties
    const specialtyPrompt = `Based on these symptoms: "${symptoms}", recommend up to 3 medical specialties (separated by commas). Just list the specialty names, nothing else.`;
    
    const specialtyCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a medical specialty matcher. Return only comma-separated specialty names.' },
        { role: 'user', content: specialtyPrompt }
      ],
      max_tokens: 100,
      temperature: 0.3
    });

    const specialtiesText = specialtyCompletion.choices[0].message.content;
    const recommendedSpecialties = specialtiesText.split(',').map(s => s.trim()).filter(s => s);

    res.json({
      success: true,
      analysis,
      recommendedSpecialties,
      urgency: severity
    });

  } catch (error) {
    console.error('Symptom Analysis Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to analyze symptoms',
      error: error.message 
    });
  }
};

// AI-Powered Doctor Recommendations
export const getDoctorRecommendations = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms) {
      return res.status(400).json({ success: false, message: 'Symptoms are required' });
    }

    const systemPrompt = `You are a medical triage assistant. Based on the user's symptoms, recommend the most appropriate medical specialty.
    
    Available specialties:
    - General physician (for general health issues, checkups, minor illnesses)
    - Gynecologist (for women's health, reproductive issues)
    - Dermatologist (for skin conditions, rashes, acne)
    - Pediatricians (for children's health)
    - Neurologist (for headaches, seizures, nervous system issues)
    - Gastroenterologist (for digestive issues, stomach problems)
    
    Return ONLY the specialty name that best matches the symptoms. No explanation needed.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Symptoms: ${symptoms}` }
      ],
      max_tokens: 50,
      temperature: 0.3
    });

    const recommendedSpecialty = completion.choices[0].message.content.trim();

    res.json({
      success: true,
      recommendedSpecialty
    });

  } catch (error) {
    console.error('AI Recommendation Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get recommendations',
      error: error.message 
    });
  }
};

// Smart Appointment Scheduling with AI
export const getSmartAppointmentSuggestions = async (req, res) => {
  try {
    const { doctorSpeciality } = req.body;

    const systemPrompt = `You are a medical appointment preparation expert. Provide 4 specific, actionable tips for preparing for a doctor's appointment.
    
    Format as a JSON array of objects with 'title' and 'description' fields.
    Make tips relevant to the specialty.
    Be practical and encouraging.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `I'm booking an appointment with a ${doctorSpeciality}. What should I prepare?` }
      ],
      max_tokens: 300,
      temperature: 0.7
    });

    let suggestions = completion.choices[0].message.content;

    // Try to parse as JSON, if fails return as string
    try {
      suggestions = JSON.parse(suggestions);
    } catch {
      // Keep as string if not valid JSON
    }

    res.json({
      success: true,
      suggestions
    });

  } catch (error) {
    console.error('AI Scheduling Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get suggestions',
      error: error.message 
    });
  }
};

// AI Health Tips Generator
export const getHealthTips = async (req, res) => {
  try {
    const { category = 'general' } = req.body;

    const systemPrompt = `You are a health and wellness expert. Generate 5 personalized health tips for the user.
    Format as a JSON array with 'tip' and 'explanation' fields.
    Make tips specific, actionable, and evidence-based.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Give me 5 health tips for ${category} wellness.` }
      ],
      max_tokens: 300,
      temperature: 0.7
    });

    let tips = completion.choices[0].message.content;

    try {
      tips = JSON.parse(tips);
    } catch {
      // Keep as string if not valid JSON
    }

    res.json({
      success: true,
      tips
    });

  } catch (error) {
    console.error('Health Tips Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get health tips',
      error: error.message 
    });
  }
};

// AI Emergency Detection
export const detectEmergency = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms) {
      return res.status(400).json({ success: false, message: 'Symptoms are required' });
    }

    const systemPrompt = `You are an emergency medical triage AI. Evaluate if the described symptoms indicate a medical emergency.
    
    Respond with JSON: { "isEmergency": boolean, "reason": "brief explanation", "action": "recommended action" }
    
    Emergency indicators include: severe chest pain, difficulty breathing, unconsciousness, severe bleeding, etc.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Are these symptoms a medical emergency? ${symptoms}` }
      ],
      max_tokens: 150,
      temperature: 0.2
    });

    let result = completion.choices[0].message.content;

    try {
      result = JSON.parse(result);
    } catch {
      result = { isEmergency: false, reason: 'Could not parse response', action: 'Contact healthcare provider' };
    }

    res.json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error('Emergency Detection Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to evaluate symptoms',
      error: error.message 
    });
  }
};
