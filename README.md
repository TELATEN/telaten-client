<div align="center">
  <h1>🎨 Telaten Client</h1>
  <p><strong>Modern Frontend for AI-Powered Business Growth Platform</strong></p>
  <p><em>Mobile-first, responsive web application built with Next.js and modern UI components</em></p>

  <!-- Tech Stack Badges -->
  <p>
    <img src="https://img.shields.io/badge/Next.js-16.0.7-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
    <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
    <img src="https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
    <img src="https://img.shields.io/badge/Tailwind%20CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  </p>

  <!-- Features Badges -->
  <p>
    <img src="https://img.shields.io/badge/shadcn%2Fui-Components-000000?style=for-the-badge" alt="shadcn/ui"/>
    <img src="https://img.shields.io/badge/React%20Query-5.90.11-FF4154?style=for-the-badge&logo=react-query&logoColor=white" alt="React Query"/>
    <img src="https://img.shields.io/badge/Mobile%20First-PWA%20Ready-9B59B6?style=for-the-badge" alt="Mobile First"/>
    <img src="https://img.shields.io/badge/Real--time-SSE-FF6B35?style=for-the-badge" alt="Real-time"/>
  </p>

  <img src="public/images/logo-telaten.png" alt="TELATEN Logo" width="200"/>
</div>

---

## 🌟 About Telaten Client

**Telaten** (Javanese: *"diligent, patient perseverance"*) Client adalah frontend modern untuk platform pertumbuhan bisnis berbasis AI yang dirancang khusus untuk UMKM Indonesia. Interface yang intuitif memungkinkan pengguna mengelola transaksi, milestone bisnis, dan berinteraksi dengan AI assistant melalui pengalaman yang mobile-first dan responsif.

---

## 🚀 Key Features

### 🎨 **Modern UI/UX**
- **📱 Mobile-First Design**: Optimized for mobile devices with responsive layout
- **🎭 Beautiful Components**: Built with shadcn/ui and Radix UI primitives
- **🌙 Dark/Light Mode**: Full theme support with next-themes
- **⚡ Smooth Animations**: Tailwind CSS animations and micro-interactions

### 🤖 **AI Integration**
- **💬 Real-time Chat**: Server-Sent Events for live AI conversation
- **🧠 Context-Aware**: AI remembers business context and preferences
- **🌐 Bilingual Support**: Indonesian and English language support
- **🛠️ Tool Integration**: AI can execute business functions

### 💰 **Financial Management**
- **📊 Transaction Tracking**: Easy income/expense recording
- **📈 Analytics Dashboard**: Real-time financial insights and charts
- **🏷️ Smart Categorization**: Custom and system-defined categories
- **📅 Period Filtering**: Daily, weekly, monthly, yearly reports

### 🎯 **Business Growth**
- **🗺️ AI-Generated Milestones**: Personalized business goals
- **✅ Task Management**: Granular progress tracking
- **📊 Progress Visualization**: Visual milestone completion
- **🎮 Gamification**: Points, levels, and achievement system

### 🏆 **Engagement System**
- **🏅 Achievement System**: Unlockable badges and rewards
- **📈 Level Progression**: Bronze → Silver → Gold → Platinum
- **🏆 Leaderboard**: Competitive rankings with other businesses
- **🎉 Celebrations**: Milestone completion animations

---

## 📋 Prerequisites

| **Requirement** | **Version** | **Installation** |
|-----------------|-------------|------------------|
| **Node.js** | ≥ 18.0 | [Download Node.js](https://nodejs.org/) |
| **Package Manager** | npm/yarn/bun | Included with Node.js |
| **Backend API** | Running | See `telaten-backend` setup |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/TELATEN/telaten-client.git
cd telaten-client
```

### 2️⃣ Install Dependencies

| **Package Manager** | **Command** | **Speed** |
|---------------------|-------------|-----------|
| **bun** ⭐ | `bun install` | Fastest |
| **npm** | `npm install` | Standard |
| **yarn** | `yarn install` | Fast |

### 3️⃣ Environment Configuration

```bash
# Copy environment template
cp .env.example .env.local
```

**📝 Environment Variables:**
```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1

# Optional: App Configuration
NEXT_PUBLIC_APP_NAME="Telaten"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4️⃣ Development Server

| **Package Manager** | **Command** | **URL** |
|---------------------|-------------|---------|
| **bun** ⭐ | `bun dev` | http://localhost:3000 |
| **npm** | `npm run dev` | http://localhost:3000 |
| **yarn** | `yarn dev` | http://localhost:3000 |

### 5️⃣ Production Build

```bash
# Build application
npm run build

# Start production server
npm start

# Or using PM2 for production deployment
pm2 start npm --name "telaten-client" -- start
```

### 🔧 Additional Scripts

| **Script** | **Purpose** | **Command** |
|------------|-------------|-------------|
| **Type Check** | TypeScript validation | `npm run typecheck` |
| **Linting** | Code quality check | `npm run lint` |
| **Formatting** | Code formatting | `npm run format` |

---

## 🏗️ Project Architecture

### 📁 **Directory Structure**

```
telaten-client/
├── app/                    # Next.js 13+ App Router
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Main dashboard
│   ├── keuangan/          # Financial management
│   ├── misi/              # Milestone management  
│   ├── assistant/         # AI chat interface
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── dashboard/        # Dashboard-specific
│   ├── finance/          # Financial components
│   └── achievement/      # Achievement components
├── hooks/                # Custom React hooks
│   ├── services/         # API integration hooks
│   └── stores/           # State management
├── lib/                  # Utility libraries
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

### 🛠️ **Technology Stack**

| **Category** | **Technology** | **Version** | **Purpose** |
|--------------|----------------|-------------|-------------|
| **Framework** | Next.js | 16.0.7 | React framework with App Router |
| **Language** | TypeScript | 5.2.2 | Type-safe JavaScript |
| **Styling** | Tailwind CSS | 3.3.3 | Utility-first CSS framework |
| **UI Components** | shadcn/ui + Radix UI | Latest | Accessible component library |
| **State Management** | Zustand | 5.0.9 | Lightweight state management |
| **Data Fetching** | React Query | 5.90.11 | Server state management |
| **HTTP Client** | Axios | 1.13.2 | HTTP requests with interceptors |
| **Forms** | React Hook Form + Zod | 7.67.0 | Type-safe form validation |
| **Charts** | Recharts | 2.12.7 | Data visualization |
| **Theme** | next-themes | 0.3.0 | Dark/light mode support |

### 🎨 **Design System**

| **Component** | **Library** | **Features** |
|---------------|-------------|--------------|
| **Base Components** | Radix UI | Accessible, unstyled primitives |
| **Styled Components** | shadcn/ui | Pre-designed, customizable |
| **Icons** | Lucide React | Consistent icon set |
| **Animations** | Tailwind CSS + Framer Motion | Smooth micro-interactions |
| **Layout** | CSS Grid + Flexbox | Responsive design patterns |

---

## 🖥️ User Experience & Features

### 🔐 **Authentication Flow**
1. **🆕 Registration**: Email-based account creation
2. **🔑 Login**: Secure JWT authentication  
3. **👤 Profile Setup**: Business information onboarding
4. **🏢 Business Profile**: Complete business details

### 📊 **Dashboard Experience**
- **📈 Financial Overview**: Income, expenses, profit visualization
- **🎯 Active Milestones**: Current business goals progress
- **🏆 Achievements**: Recent unlocked badges
- **📱 Quick Actions**: Fast access to common tasks

### 💰 **Financial Management**
- **➕ Add Transaction**: Quick income/expense recording
- **📊 Analytics**: Interactive charts and insights
- **🏷️ Categories**: Custom transaction categorization
- **📅 Filtering**: Date range and category filters
- **📈 Reports**: Automated financial summaries

### 🎯 **Milestone System**
- **🗺️ Roadmap View**: Visual milestone progression
- **✅ Task Tracking**: Granular task completion
- **🎮 Progress Rewards**: Points for milestone completion
- **🤖 AI Generation**: Smart milestone suggestions

### 🤖 **AI Assistant**
- **💬 Natural Chat**: Conversational interface
- **🧠 Context Awareness**: Business-specific responses
- **🛠️ Function Calls**: Execute business operations
- **📡 Real-time**: Live streaming responses

### 🏆 **Gamification**
- **📈 Level System**: Progressive business levels
- **🏅 Achievements**: Unlockable badges and rewards
- **🏆 Leaderboard**: Competitive business rankings
- **🎉 Celebrations**: Success animations and feedback

---

## 🎨 Customization & Theming

### 🌈 **Theme Configuration**

```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
    },
  },
}
```

### 🎭 **Component Customization**

Components are built with **CSS custom properties** and **Tailwind CSS**, making them easily customizable:

```tsx
// Example: Custom button variant
<Button variant="outline" size="sm" className="bg-primary-50">
  Custom Button
</Button>
```

---

## 🧪 Development Guidelines

### 📝 **Code Standards**

| **Aspect** | **Standard** | **Tool** |
|------------|--------------|----------|
| **TypeScript** | Strict mode | Built-in |
| **Code Formatting** | Prettier | `.prettierrc` |
| **Linting** | ESLint + Next.js | `eslint-config-next` |
| **Import Order** | Absolute imports | TypeScript paths |

### 🎯 **Best Practices**

- **🔄 State Management**: Use Zustand for client state, React Query for server state
- **📱 Mobile-First**: Design for mobile, enhance for desktop
- **♿ Accessibility**: Use Radix UI primitives for accessibility
- **⚡ Performance**: Optimize images, lazy load components
- **🎨 Consistency**: Follow design system patterns

### 🧪 **Testing Strategy**

```bash
# Component testing
npm run test

# E2E testing  
npm run test:e2e

# Type checking
npm run typecheck
```

---

## 🚀 Deployment

### 🌐 **Vercel (Recommended)**

```bash
# Connect to Vercel
npx vercel

# Deploy
npx vercel --prod
```

### 🐳 **Docker**

```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### ⚙️ **Environment Variables**

| **Variable** | **Development** | **Production** |
|--------------|-----------------|----------------|
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:8000/api/v1` | `https://api.telaten.com/api/v1` |
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | `https://telaten.com` |

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <h3>🎨 Beautiful • 📱 Responsive • ⚡ Fast</h3>
  <p><strong>Modern frontend experience for Indonesian MSMEs</strong></p>
  
  <p>
    <strong>🚀 Built with Next.js • 🎨 Styled with Tailwind • 🧩 Enhanced with shadcn/ui</strong>
  </p>
</div>
