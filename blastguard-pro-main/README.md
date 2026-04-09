<<<<<<< HEAD

=======
# BISF Prediction Platform - LLM-Driven Blast-Induced Slope Failure Prediction

An advanced AI-powered research platform for predicting and analyzing blast-induced slope failures in railway corridor reconstruction. This platform combines XGBoost, ANN, and Large Language Models for unprecedented prediction accuracy.

## 🎯 Overview

Blast-Induced Slope Failure (BISF) is a critical geotechnical hazard during railway corridor construction in mountainous terrain. This research introduces a novel LLM-driven ensemble approach that combines:

- **XGBoost** gradient boosting
- **Artificial Neural Networks (ANN)**
- **Large Language Model (LLM) reasoning**

Achieving **95.6% prediction accuracy** — significantly outperforming any standalone ML model.

## ✨ Features

- **LLM-Driven Prediction**: GPT-4 enhanced ensemble models combining XGBoost, ANN, and Random Forest
- **12-Parameter Analysis**: Comprehensive blast design evaluation covering geometry, charge design, slope parameters, and rock mass
- **Risk Assessment**: Real-time binary classification with probability scoring and multi-level risk categorization
- **Instant Results**: Sub-second predictions with engineering recommendations for blast design optimization
- **Role-Based Access**: Secure RBAC with 4 specialized roles: Engineers, Safety Managers, Reviewers, and Developers
- **95.6% Accuracy**: State-of-the-art LLM Ensemble model achieving top-tier classification performance

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4 with shadcn/ui components
- **Routing**: React Router DOM 6.30
- **State Management**: React Query (TanStack Query) 5.83
- **Form Handling**: React Hook Form 7.61 with Zod validation
- **3D Visualization**: Three.js with React Three Fiber
- **Charts**: Recharts 2.15
- **Icons**: Lucide React
- **Testing**: Vitest and Playwright

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **bun** package manager

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd blastguard-pro-main
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Building for Production

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

### Linting

Check code quality:
```bash
npm run lint
```

## 📁 Project Structure

```
blastguard-pro-main/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, videos, and other assets
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn/ui components
│   │   └── ...           # Custom components
│   ├── contexts/          # React contexts (Auth, Prediction)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   │   ├── LandingPage.tsx
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── Dashboard.tsx
│   │   ├── InputPage.tsx
│   │   ├── Analytics.tsx
│   │   └── SettingsPage.tsx
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 🔐 User Roles

The platform supports four specialized roles:

1. **Engineers**: Input blast parameters and view predictions
2. **Safety Managers**: Review risk assessments and safety clearances
3. **Reviewers**: Validate predictions and provide feedback
4. **Developers**: Manage models and system configurations

## 📊 Model Performance

| Metric | Value |
|--------|-------|
| Accuracy | 95.6% |
| ROC-AUC Score | 98.1% |
| Input Parameters | 12 |
| ML Models | 4 |

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Lint code
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for beautiful, accessible UI components built with Radix UI and Tailwind CSS.

## 📝 Research Highlights

- **XGBoost Feature Importance Analysis**: Identified specific charge and slope angle as critical parameters
- **ANN Architecture Optimization**: Multi-layer perceptron achieving 92.1% standalone accuracy
- **LLM Ensemble Integration**: Novel approach combining traditional ML with LLM reasoning
- **Railway Safety Standards Compliance**: Aligned with international railway geotechnical safety standards

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

© 2026 Railway Slope Safety Research. All rights reserved.

## 👥 Authors

- BISF Research Team
- Railway Slope Safety Research Group

## 🙏 Acknowledgments

- Research team and contributors
- Railway safety organizations
- Open-source community

---

**Note**: This is a research platform designed for geotechnical engineers, safety managers, and reviewers working on railway corridor reconstruction projects in mountainous terrain.
>>>>>>> 9373258 (updated readme)
