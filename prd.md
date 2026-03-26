Product Requirements Document (PRD)
Product: BusierDesk
Phase: Prototype (V1)

1. 🧠 Objective
Build a working prototype of BusierDesk that:
Answers incoming business calls using AI
Uses business-specific training data to respond accurately
Sends a WhatsApp follow-up after each call
Shares relevant resources (links/media)
Captures leads automatically
Supports multiple businesses (multi-tenant SaaS)
Enables subscription-based access via payment integration
Goal:
 Validate that businesses will pay for automated call handling with WhatsApp continuity and lead capture.

2. 🎯 Scope
Included (V1)
AI voice call handling
Manual business training system
WhatsApp follow-up (no ongoing chat)
Lead capture
Multi-tenant system
Subscription payments (Interswitch)
Basic dashboard
Optional call recording (internal use)

Excluded (Later Phases)
Full WhatsApp conversation support
Automated social media syncing (manual links only)
Advanced scheduling (basic capture only)
Deep analytics
Full multi-language optimization (limited initial support)

3. 👤 Target Users
Primary:
SMEs with frequent inbound calls:
Car dealers
Real estate agents
Service businesses
Pain Points:
Missed calls → lost revenue
Repetitive enquiries
Slow response times
Poor follow-up

4. 💡 Core Use Case
A customer calls a business.
The system:
AI answers the call as a human assistant
Responds using trained business knowledge
Understands customer intent
Ends the call naturally
Sends WhatsApp follow-up including:
Summary
Requested information (links/media)
Stores the interaction as a lead

5. 🧩 Core Features

5.1 AI Voice Call Handling
Description:
Handles inbound calls via telephony integration
Converts speech → text → AI response → speech
Capabilities:
Basic conversation handling
FAQ responses
Simple clarification questions
Human-like tone (no AI disclosure unless asked)
Constraints:
Acceptable latency: 1–3 seconds
Limited conversational depth

5.2 Business Training System
Description:
 Business owners manually train the AI.
Input Types:
FAQs (question + answer)
Products/services
Resource links (e.g. Instagram posts, websites)

Product Data Model (Semi-Structured)
Each product/service includes:
name
price (optional)
description
media_link (critical for WhatsApp sharing)
tags (e.g. brand, category)

5.3 WhatsApp Follow-Up Engine
Trigger:
Automatically after each call
Behavior:
Sends message to caller including:
Greeting
Call summary
Requested information
Limitations:
No continuous chat in V1

5.4 Lead Capture System
Capture and store:
Phone number
Name (if available)
Customer intent
Timestamp
Related product/service (if detected)

5.5 Basic Scheduling (Lite)
AI can capture interest in booking
Store preferred time from customer
Notify business owner
(No full calendar sync in V1)

5.6 Admin Dashboard
Business users can:
View call logs
View leads
Manage FAQs
Manage products/services
Add/edit resource links
View basic activity

5.7 Multi-Tenant Architecture
Each business has isolated data:
Knowledge base
Calls
Leads
All requests scoped by business_id

5.8 Call Recording (Optional/Internal)
Calls may be recorded for:
Debugging
Quality improvement
Behavior:
Enabled internally by default
Stored short-term (7–14 days)

5.9 Payment System (Interswitch)
Purpose:
Enable subscription-based access
Features:
Plan selection
Payment processing
Webhook verification
Account activation

6. 🔄 User Flows

6.1 Business Onboarding
Business signs up
Selects subscription plan
Completes payment via Interswitch
Gains access to dashboard
Adds:
FAQs
Products
Links
Receives assigned phone number

6.2 Customer Call Flow
Customer calls business number
AI answers as human assistant
Conversation handled
Intent identified
Call ends

6.3 Post-Call Flow
System generates summary
AI prepares WhatsApp follow-up
Message sent to customer
Lead stored

7. ⚙️ Functional Requirements
Voice
Handle inbound calls via webhook
Process speech-to-text
Generate and return responses

AI
Accept structured input:
business knowledge
conversation history
Return:
response message
detected intent

WhatsApp
Send outbound messages
Support text + links

Training
CRUD operations for:
FAQs
products
links

Leads
Store and retrieve leads

Payments
Initialize payment
Verify via webhook
Activate subscription

8. 📏 Success Metrics
% of calls successfully handled
% of calls with WhatsApp follow-up
Leads generated per business
Conversion signals (e.g. booking interest)
Business retention/feedback

9. ⚠️ Constraints
Keep response latency under 3 seconds
Minimize AI usage cost
Keep onboarding under 5 minutes
Ensure system reliability

10. 🧱 Technical Stack
Backend: nest.js
Database: PostgreSQL + Prisma
Queue: BullMQ + Redis
AI: OpenAI
STT: Deepgram
TTS: ElevenLabs
Telephony: Twilio
WhatsApp: Twilio WhatsApp API
Payments: Interswitch
Frontend: React

11. 🧪 Known Limitations
No real-time voice optimization
Limited conversational intelligence
No automated social media ingestion
No full scheduling system
No deep analytics

12. 🚀 Phase 2 Direction
WhatsApp full conversation support
Instagram auto-sync
Multi-language expansion
Calendar integrations
Advanced analytics
AI self-learning from conversations

🧠 Final Notes
The core value is not just answering calls—it is what happens after the call
WhatsApp follow-up is the key differentiator in V1
Business training quality directly impacts product success
Speed to real user feedback is more important than feature completeness
