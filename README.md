# 🎯 Job Application Tracker: Elite Edition

A state-of-the-art, professional-grade career workstation built to organize your job search and accelerate your interview success with AI intelligence.

![Premium Dashboard](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJ4eG14eG14eG14eG14eG14eG14eG14eG14eG14eG14eG14JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKMGpxu5dG0T6mc/giphy.gif)

## 🌟 Key Features

### 🧠 AI Interview Coach (Powered by Llama 3.3)
- **Custom Strategies**: Generates tailored interview questions based on the company, role, and your research notes.
- **STAR Answer Blueprints**: Provides step-by-step structures on how to build winning responses.
- **Recruiter's Perspective**: Explains what interviewers are actually evaluating for each question.
- **Common Pitfalls**: Protects you from making easy mistakes with role-specific warnings.

### ☁️ Cloud Registry & Evidence Archival
- **Resume Versioning**: Store the exact resume you sent for each specific application via **Cloudinary**.
- **Job Posting Screenshots**: Never lose the job details even if the listing is taken down.
- **Lazy Cloud Initialization**: Robust service design that prevents app crashes even if cloud keys are missing.

### 💎 Premium Workstation UI
- **Insight Dashboard**: A redesigned header system with company branding, dynamic metadata, and application IDs.
- **Streamlined Navigation**: Architecturally consistent "Back to List" logic across all views for a focused workflow.
- **Journey Stepper**: Visual progress tracking (Applied → Interview → Offer).
- **Glassmorphic AI Card**: State-of-the-art "Glass" design with pulsing glow effects and backdrop blurs.
- **Sticky Workstation**: Sidebar evidence follows you as you scroll through long AI strategies.

---

## 🛠️ Technical Stack

- **Core**: Laravel 12 & PHP 8.2+
- **Frontend**: React 18, TypeScript, & Tailwind CSS v4
- **Engine**: Inertia.js (The monolith approach)
- **AI Integration**: Groq Cloud SDK (Llama 3.3)
- **Cloud Storage**: Cloudinary (SDK v2)

---

## ⚙️ Installation & Setup

### 1. Requirements
- Node.js & NPM
- Composer
- PHP 8.2+
- SQLite (or your preferred DB)

### 2. Configuration
Copy the `.env.example` to `.env` and configure the following keys:

```env
# AI Integration (Groq)
GROQ_API_KEY=your_groq_key_here

# Cloud Storage (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Installation
```bash
# Install PHP dependencies
composer install

# Install JS dependencies
npm install

# Run Migrations
php artisan migrate

# Start Servers
php artisan serve
npm run dev
```

---

## 🛡️ Code Excellence
This project is built with **Strict Type Safety**. Every core page is 100% typed with TypeScript interfaces to ensure reliable GitHub CI/CD deployments and a superior developer experience.

---

## ⚖️ License
MIT License. Feel free to use this to land your dream job! 🚀👔☀️
