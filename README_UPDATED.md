# 🏥 Prescripto - AI-Powered Doctor Appointment System

**Advanced Full-Stack MERN application for booking doctor appointments with cutting-edge AI features and modern UI design.**

![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-v18+-blue)
![React](https://img.shields.io/badge/react-19.0-blue)

## 🌐 Live Demo
[https://doctors-web-1.onrender.com](https://doctors-web-1.onrender.com)

## ✨ Key Features

### 👥 User Management
- ✅ Patient registration and authentication
- ✅ Doctor profile management
- ✅ Admin system oversight
- ✅ JWT-based secure authentication
- ✅ Bcrypt password encryption

### 📅 Appointment System
- ✅ Browse and filter doctors by specialty
- ✅ Real-time appointment booking
- ✅ Appointment history tracking
- ✅ Cancellation management
- ✅ Status updates and notifications

### 🤖 Advanced AI Features
- **Smart Symptom Analyzer**: Multi-step symptom assessment with AI-powered health analysis
- **AI Health Chatbot**: 24/7 intelligent medical assistant with multiple conversation modes
- **AI Doctor Recommendations**: Specialty matching based on symptoms
- **Appointment Preparation Guide**: Personalized AI tips for appointment preparation
- **Emergency Detection**: AI-powered emergency symptom identification
- **Health Tips Generator**: Personalized wellness recommendations

### 📊 Health Dashboard
- ✅ Personal health metrics overview
- ✅ Appointment history and upcoming bookings
- ✅ AI-powered health insights
- ✅ Quick navigation to key features
- ✅ Health score tracking

### 🎨 Modern UI/UX
- ✅ Glassmorphism design pattern
- ✅ Smooth animations with Framer Motion
- ✅ Responsive design (mobile-first)
- ✅ Modern color scheme (Indigo, Purple, Pink)
- ✅ Beautiful gradient backgrounds
- ✅ Interactive components with hover effects
- ✅ Enhanced typography and spacing
- ✅ Accessibility best practices

## 🚀 Tech Stack

### Frontend
- **React 19** - UI library with hooks
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Toastify** - Notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **OpenAI API** - AI/ML capabilities
- **Cloudinary** - Image storage

### Admin Panel
- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation

## 🛠️ Installation & Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- OpenAI API key
- Cloudinary account (optional, for image storage)

### 1. Clone & Setup
```bash
git clone https://github.com/yourusername/prescripto.git
cd prescripto
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
PORT=5000
EOF

npm run server
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env file
cat > .env << EOF
VITE_BACKEND_URL=http://localhost:5000
EOF

npm run dev
```

### 4. Admin Setup
```bash
cd admin
npm install

# Create .env file
cat > .env << EOF
VITE_BACKEND_URL=http://localhost:5000
EOF

npm run dev
```

## 📊 Project Structure

```
prescripto/
├── frontend/                 # Patient-facing application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── AdvancedSymptomChecker.jsx    [NEW]
│   │   │   ├── EnhancedDoctorCard.jsx        [NEW]
│   │   │   ├── AIAppointmentTipsEnhanced.jsx [NEW]
│   │   │   ├── Header.jsx                     [ENHANCED]
│   │   │   ├── Navbar.jsx                     [ENHANCED]
│   │   │   ├── AIChatbot.jsx                  [ENHANCED]
│   │   │   └── ...
│   │   ├── pages/           # Page components
│   │   │   ├── HealthDashboard.jsx [NEW]
│   │   │   └── ...
│   │   ├── context/         # Context API
│   │   ├── assets/          # Images & icons
│   │   └── index.css        # Global styles [ENHANCED]
│   ├── package.json
│   └── vite.config.js
│
├── admin/                    # Admin dashboard
│   ├── src/
│   └── ...
│
├── backend/                  # Express API server
│   ├── controllers/
│   │   ├── aiController.js  [ENHANCED - 6 AI endpoints]
│   │   └── ...
│   ├── routes/
│   │   ├── aiRoute.js       [ENHANCED]
│   │   └── ...
│   ├── models/
│   ├── middlewares/
│   ├── config/
│   ├── server.js
│   └── .env
│
├── IMPROVEMENTS.md          [NEW - Detailed improvements guide]
├── AI_SETUP.md             [AI setup instructions]
├── README.md               [This file]
└── package.json
```

## 🤖 AI Endpoints

### 1. Advanced Symptom Analysis
```bash
POST /api/ai/analyze-symptoms
```
Analyzes symptoms and provides:
- Health analysis
- Recommended specialties
- Urgency level
- Safety warnings

### 2. Enhanced Chatbot
```bash
POST /api/ai/chat
```
Modes: `general`, `medication`, `symptoms`, `wellness`

### 3. Health Tips
```bash
POST /api/ai/health-tips
```
Personalized wellness recommendations

### 4. Emergency Detection
```bash
POST /api/ai/detect-emergency
```
Identifies emergency symptoms

### 5. Doctor Recommendations
```bash
POST /api/ai/recommend-doctor
```
Suggests specialists based on symptoms

### 6. Appointment Tips
```bash
POST /api/ai/appointment-suggestions
```
Provides preparation tips for appointments

## 🎨 Design System

### Colors
- Primary: `#5f6FFF` (Indigo)
- Secondary: `#A855F7` (Purple)
- Accent: `#EC4899` (Pink)
- Backgrounds: Gradient (Blue → Purple → Pink)

### Typography
- Font Family: Poppins, Outfit
- Sizes: 12px to 60px
- Weights: 300, 400, 500, 600, 700

### Components
- `btn-primary` - Main CTA button
- `btn-secondary` - Alternative button
- `card-modern` - Modern card with glassmorphism
- `input-modern` - Enhanced input field
- `gradient-text` - Gradient text effect
- `shadow-glow` - Glowing shadow effect

## 🔐 Security Features

- ✅ JWT token-based authentication
- ✅ Password hashing with Bcrypt
- ✅ Protected API endpoints
- ✅ CORS configuration
- ✅ Input validation and sanitization
- ✅ Environment variable protection
- ✅ Secure error handling

## 📱 Responsive Design

Fully responsive across all devices:
- ✅ Mobile (320px and up)
- ✅ Tablet (768px and up)
- ✅ Desktop (1024px and up)
- ✅ Wide screens (1920px+)

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel
```

### Backend (Render/Heroku)
```bash
cd backend
# Push to repository
# Connect to deployment platform
```

### Admin (Vercel)
```bash
cd admin
npm run build
# Deploy to Vercel
```

## 📝 API Documentation

Detailed API documentation available in [API_DOCS.md](./API_DOCS.md)

## 🧪 Testing

### Manual Testing
```bash
# Test chatbot
curl -X POST http://localhost:5000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"I have a headache"}'

# Test symptom analyzer
curl -X POST http://localhost:5000/api/ai/analyze-symptoms \
  -H "Content-Type: application/json" \
  -d '{"symptoms":"fever","duration":"2 days","severity":"Moderate"}'
```

## 🐛 Troubleshooting

### AI Features Not Working
- Verify `OPENAI_API_KEY` in `.env`
- Check OpenAI API quota
- Verify backend is running

### Database Connection Issues
- Check MongoDB URI
- Verify network access whitelist
- Ensure database exists

### Frontend Errors
- Clear cache: `npm cache clean --force`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check environment variables

## 📈 Performance Optimizations

- ✅ Code splitting with React.lazy()
- ✅ Image optimization with Cloudinary
- ✅ CSS-in-JS optimization
- ✅ API response caching
- ✅ Lazy loading components
- ✅ Efficient state management

## 🔄 Future Enhancements

- [ ] Video consultation feature
- [ ] Prescription management
- [ ] Medical records integration
- [ ] Insurance verification
- [ ] Lab report integration
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Telemedicine integration
- [ ] Payment gateway integration

## 📚 Documentation

- [AI Setup Guide](./AI_SETUP.md) - Setup AI features
- [Improvements Guide](./IMPROVEMENTS.md) - New features documentation
- [API Documentation](./API_DOCS.md) - API endpoints reference
- [Component Guide](./COMPONENTS.md) - Component documentation

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file

## 💬 Support

For support, email: akashmishra0389@gmail.com

## Author

**Akash Mishra**
- Email: akashmishra0389@gmail.com
- GitHub: [@akashmishra](https://github.com/akashmishra)

## Acknowledgments

- OpenAI for GPT API
- Tailwind CSS for styling
- Framer Motion for animations
- MongoDB for database
- All contributors and users

---

**Built with ❤️ for better healthcare connectivity**
