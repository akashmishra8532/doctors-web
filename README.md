# 🏥 Doctor Appointment Booking System

Full-stack MERN application for booking doctor appointments with AI-powered features.


## ✨ Features
- User authentication (patients, doctors, admin)
- Doctor browsing and appointment booking
- Admin dashboard for system management
- **NEW**: AI Health Chatbot for medical assistance
- **NEW**: AI-powered doctor recommendations
- **NEW**: Smart appointment scheduling tips
- Responsive design with Tailwind CSS
- Modern glassmorphism UI with smooth animations

## 🤖 AI Features
- **AI Health Chatbot**: 24/7 medical assistance chatbot powered by OpenAI
- **Smart Doctor Recommendations**: Describe symptoms and get AI-recommended specialists
- **Appointment Tips**: AI-powered tips for preparing for your appointments

## 🚀 Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **AI**: OpenAI GPT-3.5-turbo
- **Auth**: JWT, Bcrypt
- **Storage**: Cloudinary

## 🛠️ Quick Start

### 1. Setup OpenAI API (Required for AI features)
See [AI_SETUP.md](./AI_SETUP.md) for detailed instructions.

### Backend
```bash
cd backend
npm install
# Add OPENAI_API_KEY to .env file
npm run server
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Admin
```bash
cd admin
npm install
npm run dev
```

## 📁 Structure
```
prescripto/
├── frontend/     # Patient app with AI features
├── admin/        # Admin dashboard
├── backend/      # API server with AI endpoints
├── AI_SETUP.md   # AI integration setup guide
└── README.md
└── .env          # Environment variables
```

## 🔧 AI Setup
For AI features to work, you need to:
1. Get an OpenAI API key from [platform.openai.com](https://platform.openai.com)
2. Add it to `backend/.env` as `OPENAI_API_KEY=your_key_here`
3. See [AI_SETUP.md](./AI_SETUP.md) for detailed instructions

## 🎨 UI Enhancements
- Glassmorphism design with backdrop blur effects
- Smooth animations using Framer Motion
- Gradient backgrounds and buttons
- Modern color scheme with indigo/purple accents
- Responsive design for all devices

## ��‍💻 Author
**Akash Mishra** - akashmishra0389@gmail.com
