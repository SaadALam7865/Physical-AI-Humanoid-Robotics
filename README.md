# Physical AI & Humanoid Robotics: Interactive Textbook

**An AI-native educational platform for learning Embodied Intelligence, ROS 2, and Humanoid Robotics.**

![Project Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-blue)

## 📚 Overview

This project is a comprehensive, interactive textbook designed to bridge the gap between **Digital AI** (LLMs in the cloud) and **Physical AI** (robots in the real world).

Unlike traditional static textbooks, this platform features:
- **RAG-Powered AI Tutor**: A built-in chatbot (Gemini + Qdrant) that answers questions based strictly on the textbook content.
- **Interactive Labs**: Hands-on exercises for ROS 2, Isaac Sim, and Jetson deployment.
- **Personalized Learning**: User profiles track experience levels (Python vs C++) and hardware availability (Simulation vs Real Robot) to adapt the content.

## 🏗️ Architecture

The system follows a modern microservices architecture:

```mermaid
graph TD
    User[Student] --> Frontend[Frontend (Docusaurus)]
    Frontend --> Auth[Auth Service (Node.js)]
    Frontend --> Backend[Backend (Python FastAPI)]
    
    Auth --> DB[(Neon PostgreSQL)]
    Backend --> VectorDB[(Qdrant Cloud)]
    Backend --> LLM[Gemini 1.5 Flash]
```

### 1. Frontend (`/frontend`)
- **Tech**: Docusaurus (React/TypeScript)
- **Role**: Renders the textbook content (MDX), manages UI state, and hosts the interactive Chat Widget.
- **Features**: Dark mode, Mermaid diagram support, Custom React components for auth/chat.

### 2. Backend (`/backend`)
- **Tech**: Python (FastAPI), LangChain/OpenAI Agents
- **Role**: Powers the RAG (Retrieval-Augmented Generation) chatbot.
- **Flow**: Receives query -> Embeds query -> Retrieves context from Qdrant -> Generates answer via Gemini.

### 3. Auth Service (`/auth-service`)
- **Tech**: Node.js (Express), Better Auth
- **Role**: Manages user identity and profiles.
- **Database**: Neon Serverless PostgreSQL (Stores users + questionnaire data).

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Python 3.10+
- PostgreSQL (or Neon account)
- Qdrant Cloud account
- Gemini API Key

### 1. Clone the Repository
```bash
git clone https://github.com/uneezaismail/Physical-AI-Humanoid-Robotics.git
cd Physical-AI-Humanoid-Robotics
```

### 2. Setup Auth Service
```bash
cd auth-service
cp .env.example .env
# Fill in DATABASE_URL and BETTER_AUTH_SECRET
npm install
npm run migrate
npm run dev
# Runs on http://localhost:3002
```

### 3. Setup Backend
```bash
cd backend
# Create virtual env
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
# Setup .env with GEMINI_API_KEY and QDRANT credentials
uvicorn app.main:app --reload
# Runs on http://localhost:8000
```

### 4. Setup Frontend
```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```

## 📖 Key Features

- **Embodied Intelligence Focus**: Teaches why "Brain in a Body" is different from "Brain in a Box".
- **Hardware-First**: Specific guides for NVIDIA Jetson Orin Nano and Unitree robots.
- **Sim-to-Real**: Workflows for training in Isaac Sim and deploying to physical hardware.
- **Partner Economy**: Concepts of Human-AI-Robot collaboration.

## 🤝 Contributing

Contributions are welcome! Please read `CONTRIBUTING.md` (coming soon) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
