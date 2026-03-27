# BusierDesk

**BusierDesk** is an AI-powered, multi-language voice and messaging agent that acts as a 24/7 front desk for businesses.

It handles customer calls, understands business-specific context, and seamlessly continues interactions via WhatsApp—enabling businesses to respond instantly, share relevant content, and convert enquiries into actions.

---

## Live Demo

* **App URL:** [https://busier-desk-kjo5.vercel.app/authentication](https://busier-desk-kjo5.vercel.app/authentication)
* **Demo Phone Number:** +1 (276) 533-9590
* **Backend API:** Deployed on Railway

### How to Test

1. Call the demo number
2. Ask about a service/product
3. The AI will respond based on trained business data
4. After the call, a WhatsApp follow-up is triggered (integration configured, pending final activation)

---

Tech Stack
Frontend (Client Dashboard)

Framework: React.js (Deployed on Vercel)
Styling: Tailwind CSS
Backend (API & Data)

Framework: NestJS (Node.js)
Database: Neon (Serverless PostgreSQL)
ORM: Prisma
Authentication: Better Auth
Deployment: Railway
AI & Telephony

Voice Orchestration: Vapi
Messaging/Handoff: Twilio WhatsApp API (Configured)

---

## Core Features

### AI Voice Call Handling

* Handles inbound calls using Vapi
* Understands user intent and responds conversationally
* Uses business-specific training data

---

### WhatsApp Follow-Up

* Automatically triggered after each call
* Sends:

  * Call summary
  * Relevant links/resources
* Built with Twilio (integration configured, not yet fully activated)

---

### Lead Capture System

* Captures:

  * Phone number
  * Customer intent
  * Timestamp
* Stored in database for business use

---

### Multi-Tenant SaaS

* Supports multiple businesses
* Each business has:

  * Isolated data
  * Custom training (FAQs, products, links)

---

### Subscription Payments

* Integrated with Interswitch
* Enables subscription-based access

---

### Admin Dashboard

Businesses can:

* View call logs
* Manage leads
* Add FAQs and product data
* Configure resources

---

## Tech Stack

### Backend

* Framework: NestJS
* Database: Neon (PostgreSQL)
* ORM: Prisma
* Authentication: Better Auth
* Deployment: Railway

### AI + Voice

* Voice AI / Telephony: Vapi

### Messaging

* WhatsApp API: Twilio (configured)

### Frontend

* React (Vercel deployed)

---

## Local Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

---

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

### 3. Backend Setup

```bash
cd backend
npm install
npm run start:dev
npx prisma generate
```

---

### 4. Environment Variables

Create a `.env` file in the backend:

```bash
cp .env.example .env
```

Fill in required variables (API keys, database URL, Neon DB, Interswitch, and Vapi keys)

---

## What’s Fully Working

* AI handles incoming calls
* Leads stored in database
* Multi-tenant architecture
* Subscription payments (Interswitch)
* Dashboard

---

## Partial / In Progress

* WhatsApp follow-up (Twilio configured but not fully connected)

---

## Problem

Businesses lose revenue due to:

* Missed calls
* Slow responses
* Poor follow-up

---

## Solution

BusierDesk ensures:

* Every call is answered
* Every enquiry is followed up
* Every interaction becomes a lead

---

## What Makes BusierDesk Different

It doesn’t just answer calls — it continues the conversation and drives conversion.

Most solutions stop at call handling.
BusierDesk extends the interaction into WhatsApp, where real business happens.

---

## Future Improvements

* Full WhatsApp conversation support
* Multi-language optimization
* Calendar and scheduling integration
* Advanced analytics
* AI self-learning from conversations

---

## Team
Amarachi Evunde — Project Manager
Munachi Onyebuchi — Lead Frontend Engineer & UI/UX
Emmanuel Sunday — Backend Engineer
Victor Jonah — AI & Software Engineer
BusierDesk - Built for the Enyata x Interswitch Buildathon

---
