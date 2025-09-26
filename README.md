# 📚 AI Study Tracker

AI Study Tracker is a web-based application designed to help students monitor their study activities, manage academic progress, and optimize productivity.  
The system integrates **IBM Granite AI** for natural language processing, activity summarization, productivity pattern detection, and personalized study recommendations.  

---

## ✨ Features
- 📝 **Natural Language Logging**: Record study sessions in plain text (e.g., *"I studied Calculus for 2 hours"*).  
- 🤖 **AI-Powered Insights**: Summaries of daily/weekly activities, productivity patterns, and smart recommendations.  
- 📊 **Interactive Dashboard**: Visual charts for study hours, subject progress, and task completion.  
- 📅 **Calendar Integration**: Manage assignments, exams, and deadlines.  
- 🔐 **Secure Authentication**: User accounts with JWT + bcrypt.  
- ☁️ **Cloud Ready**: Containerized with Docker and deployable to AWS/Vercel/Railway.  

---

## 🛠️ Tech Stack

### 🎨 Frontend
- React.js 18.x  
- Tailwind CSS 3.x  
- Recharts 2.x (charts & graphs)  
- Lucide React (icons)  
- React Hooks (`useState`, `useEffect`)  
- Vite / Create React App  

### ⚙️ Backend
- Node.js 18.x+  
- Express.js 4.x  
- MongoDB 6.x + Mongoose  
- JWT + bcrypt (authentication)  
- Joi / Yup (validation)  
- dotenv, cors, helmet, express-rate-limit  

### 🤖 AI & ML Services
- IBM Granite (via Watson API) – primary AI  
- OpenAI GPT-4 – fallback AI  
- Custom analytics for pattern recognition  

### 🚀 DevOps & Deployment
- Docker & Docker Compose  
- GitHub Actions (CI/CD)  
- Hosting: AWS / Vercel / Railway  
- Database: MongoDB Atlas  
- Optional CDN: Cloudflare  

---

## ⚡ Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/your-username/ai-study-tracker.git
cd ai-study-tracker
