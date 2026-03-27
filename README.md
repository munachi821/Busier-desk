# 🟢 BusierDesk
**The 24/7 AI Voice & Messaging Receptionist for Local Businesses.**

**Built for the Enyata x Interswitch Buildathon.**

BusierDesk is an AI-powered, multi-language voice and messaging agent that acts as a 24/7 front desk for businesses. It handles customer calls, understands business-specific context, and seamlessly continues interactions via WhatsApp—enabling businesses to respond instantly, share relevant content, and convert enquiries into sales.

---

## 🚀 The Pitch

### The Problem
Businesses lose massive amounts of revenue daily due to missed calls, slow responses, and poor follow-up. Most local vendors simply cannot answer the phone while servicing a customer, causing hot leads to slip away.

### The Solution
BusierDesk ensures every single call is answered, every enquiry is followed up on, and every interaction is captured as a lead. 

**What makes us different:** We don’t just answer calls—we continue the conversation. Most solutions stop at call handling. BusierDesk extends the interaction into WhatsApp, dropping resources and booking links right where real business happens.

---

## 🌐 Live Demo & Testing

* **Live Dashboard:** [https://busier-desk-kjo5.vercel.app/authentication](https://busier-desk-kjo5.vercel.app/authentication)
* **Demo Phone Number:** `+1 (276) 533-9590`
* **Backend API:** Deployed securely on Railway

### How to Test the Agent
1. Call the demo number.
2. Ask about a service or product (e.g., pricing, availability, or location).
3. The AI will respond conversationally based on trained business data.
4. *Note: A WhatsApp follow-up is triggered post-call (integration configured, pending final live activation).*

---

## ✨ Core Features

* **AI Voice Call Handling:** Powered by Vapi, the agent understands user intent, speaks conversationally, and pulls from custom business data.
* **Lead Capture System:** Automatically extracts the caller's phone number, intent, and timestamp, storing them in the dashboard for the business owner.
* **Multi-Tenant SaaS Architecture:** Supports multiple businesses, each with strictly isolated data and their own custom AI training (FAQs, products, links).
* **Subscription Billing:** Fully integrated with **Interswitch** to process seamless, recurring subscription payments for vendors.
* **Kinetic Admin Dashboard:** A premium interface where business owners can view call logs, manage leads, update their AI's FAQs, and track subscription status.
* **Smart WhatsApp Follow-Up:** Triggers after a call to send summaries and relevant links via Twilio (Configured).

---

## 🛠 Tech Stack

**Frontend (Client Dashboard)**
* **Framework:** React.js (Deployed on Vercel)
* **Styling:** Tailwind CSS

**Backend (API & Data)**
* **Framework:** NestJS (Node.js)
* **Database:** Neon (Serverless PostgreSQL)
* **ORM:** Prisma
* **Authentication:** Better Auth
* **Deployment:** Railway

**AI & Telephony**
* **Voice Orchestration:** Vapi
* **Messaging/Handoff:** Twilio WhatsApp API (Configured)

---

## 🚦 Buildathon Status Report

**✅ What is Fully Working (Live Demo):**
* AI successfully handles and negotiates incoming calls.
* Leads are accurately extracted and stored in the database.
* The Multi-tenant architecture securely isolates business accounts.
* Subscription payments process successfully via Interswitch.
* The Frontend Admin Dashboard is fully functional.

**🚧 Partial / In Progress:**
* WhatsApp follow-up (Twilio webhook routing is configured, but pending final pipeline activation).

**🔮 Future Roadmap:**
* Full two-way WhatsApp conversational support.
* Multi-language optimization (Pidgin, Hausa, Igbo, Yoruba).
* Direct calendar and scheduling integration.

---

## 💻 Local Setup Instructions

### 1. Clone the Repository
\`\`\`bash
git clone <your-repo-url>
cd <project-folder>
\`\`\`

### 2. Backend Setup
\`\`\`bash
cd backend
npm install
cp .env.example .env  # Add your Neon DB, Interswitch, and Vapi keys here
npx prisma generate
npm run start:dev
\`\`\`

### 3. Frontend Setup
Open a new terminal window:
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

---

## 👥 The Team

* **Amarachi Evunde** — Project Manager
* **Munachi Onyebuchi** — Lead Frontend Engineer & UI/UX
* **Emmanuel Sunday** — Backend Engineer
* **Victor Jonah** — AI & Telephony Engineer
