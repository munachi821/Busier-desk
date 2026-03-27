# 🟢 BusierDesk

**The 24/7 AI Voice Receptionist for Nigerian Local Businesses.**

## 🚀 The Pitch

### The Problem

Local Nigerian SMEs (auto repair shops, restaurants, salons) lose millions of Naira annually in missed leads simply because the owner cannot answer the phone while working. Current enterprise AI voice solutions are built for massive call centers and charge terrifying, unpredictable "per-token" and "per-minute" micro-transactions that local vendors refuse to adopt.

### The Solution: BusierDesk

BusierDesk democratizes AI voice reception for the local market through **Cost Certainty**. For a predictable, flat monthly subscription, local businesses get a dedicated AI voice agent that answers every call 24/7, negotiates bookings, and answers FAQs.

**The "Smart Handoff" Advantage:** To protect the vendor's voice minute quota, our AI agent is programmed to intelligently cap voice calls and instantly transition the customer to the WhatsApp Business API to complete their booking via text. We protect their revenue, and we protect their wallet.

---

## ✨ Key Features

- **Real-Time AI Voice Agent:** Human-like, low-latency conversational AI tailored to specific business domains (e.g., auto repair pricing, restaurant reservations).
- **Smart WhatsApp Handoff:** Automatically transitions lengthy calls to a cheap text-based WhatsApp thread to conserve the vendor's monthly voice minutes.
- **Predictable SaaS Billing:** A flat monthly subscription tier, removing the anxiety of unpredictable cloud token billing.
- **Kinetic Command Center:** A premium, dark-mode real-time dashboard for vendors to view call logs, monitor minute usage, and read AI-generated call summaries.

---

## 🛠 Tech Stack

**Frontend (Client Dashboard)**

- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS & Lucide Icons
- **Hosting:** Vercel & Railway

**Backend (API & Data)**

- **Framework:** NestJS (Node.js)
- **Database:** PostgreSQL (via Prisma ORM)
- **Hosting:** Railway

**AI & Telephony Infrastructure**

- **Voice Orchestration:** Vapi / Retell (WebRTC, STT, TTS)
- **Intelligence:** OpenAI (GPT-4o-mini)
- **Telecom Provider:** Twilio (SIP & Number Provisioning)

---

## 💻 How to Run Locally

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/your-org/busierdesk.git
cd busierdesk
\`\`\`

### 2. Backend Setup (NestJS)

\`\`\`bash
cd backend
npm install

# Set up your environment variables

cp .env.example .env

# Edit .env with your PostgreSQL DATABASE_URL and API Keys

# Generate the Prisma Client and sync the database

npx prisma generate
npx prisma db push

# Start the development server

npm run start:dev
\`\`\`
_The backend will run on `http://localhost:3000`_

### 3. Frontend Setup (React/Vite)

Open a new terminal window:
\`\`\`bash
cd frontend
npm install

# Set up your environment variables

cp .env.example .env

# Ensure VITE_API_URL is set to http://localhost:3000

# Start the Vite development server

npm run dev
\`\`\`
_The frontend will run on `http://localhost:5173`_

---

## 👥 Team & Contributions

BusierDesk was built by a highly specialized team of four, bridging the gap between product strategy, a high-performance client dashboard, robust infrastructure, and state-of-the-art AI telephony.

**Amarachi Evunde — Project Manager**

- **Product Strategy & Scoping:** Led the core product vision, ensuring the engineering team remained focused on the MVP requirements and the specific pain points of the Nigerian SME market.
- **Sprint Execution:** Managed the extended buildathon timeline, coordinating the crucial integration handoffs between the frontend, backend, and AI branches to prevent deployment bottlenecks.
- **Business Narrative:** Orchestrated the final pitch and presentation strategy, ensuring the complex technical architecture translated perfectly into a compelling, vendor-friendly SaaS business case for the judges.

**Munachi Onyebuchi — Lead Frontend Engineer & UI/UX**

- **Frontend Architecture:** Bootstrapped and structured the React (Vite) client, ensuring a fast, scalable foundation, successfully deployed on Vercel.
- **Design System & UI:** Designed and developed the "Kinetic Command Center" dashboard from scratch using Tailwind CSS, establishing a premium Deep Charcoal and Emerald Green B2B aesthetic.
- **Feature Implementation:** Built the interactive state-based UI for critical features, including Subscription Tier tracking, Agent Configuration, Profile Settings, and the dynamic Notification Inbox.
- **API Integration:** Wired the frontend client to the NestJS backend, handling asynchronous data fetching, state management, and error handling for a seamless user experience.

**Emmanuel Sunday — Backend Engineer**

- **Core API & Infrastructure:** Architected the secure NestJS REST API and managed the PostgreSQL database schema using Prisma ORM.
- **Cloud Deployment:** Successfully containerized and deployed the backend infrastructure on Railway, managing dynamic port binding and CORS security policies.
- **Subscription & Billing Logic:** Built the underlying logic for the monthly subscription tier system and real-time minute usage tracking for the vendor dashboard.

**Victor Jonah — AI & Telephony Engineer**

- **Voice Orchestration:** Engineered the complex telephony stack, integrating Twilio for SIP provisioning and Vapi/Retell for real-time webRTC, Speech-to-Text (STT), and Text-to-Speech (TTS) handling.
- **Intelligence & Prompting:** Managed the OpenAI LLM integration, optimizing the context windows and agent prompts to ensure the AI responds accurately to local auto-repair inquiries.
- **The "Smart Handoff" Pipeline:** Programmed the cost-saving routing logic that tracks active call minutes and seamlessly transitions customers to the WhatsApp Business API when the vendor's minute cap is reached.
