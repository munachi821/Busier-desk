import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import Groq from 'groq-sdk';

@Injectable()
export class ChatbotService {
  private groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  constructor(private prisma: PrismaService) {}

  async getChatResponse(userId: string, userMessage: string, chatHistory: any[] = []) {
    // 1. Fetch ALL business context
    const assistant = await this.prisma.businessAssistant.findUnique({
      where: { userId },
      include: {
        context: true,
        faqs: true,
        products: true,
        resourceLinks: true,
      },
    });
    if (!assistant) throw new NotFoundException('Business assistant not found');

    // 2. Format the full knowledge base for the LLM
    const knowledgeBase = `
      Business Name: ${assistant.name}
      General Context: ${assistant.context?.content ?? ''}
      System Prompt: ${assistant.systemPrompt ?? 'You are a helpful assistant.'}
      FAQs: ${assistant.faqs.map(f => `Q: ${f.question} A: ${f.answer}`).join('\n')}
      Products: ${assistant.products.map(p => `${p.name}: ${p.description} ($${p.price})`).join('\n')}
      Links: ${assistant.resourceLinks.map(l => `${l.title}: ${l.url}`).join('\n')}
    `;

    // 3. Build system prompt with lead capture + anti-hallucination rules
    const systemPrompt = `
      You are an AI assistant for ${assistant.name}.
      Use the following context to answer: ${knowledgeBase}

      Strict Rule: If the answer is not in the context, say "I'm sorry, I don't have information on that." Do not hallucinate.

      ENGAGEMENT RULE: If the user seems interested but hasn't left their contact details,
      kindly ask if they'd like to be contacted by a human expert.

      LEAD CAPTURE RULE: If the user provides their name, email, or phone number,
      append this exact tag at the end of your response: [LEAD_CAPTURE: name|email|phone].
      If they don't provide any contact info, do not add the tag.
    `;

    // 4. Call Groq with full chat history for context continuity
    const completion = await this.groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        ...chatHistory,
        { role: 'user', content: userMessage },
      ],
      model: 'llama-3.3-70b-versatile',
    });

    const aiResponse = completion.choices[0]?.message?.content ?? '';

    // 5. Fire-and-forget background lead identification (via tag OR LLM extraction)
    this.identifyAndSaveLead(userId, userMessage, aiResponse);

    // 6. Strip the inline tag before returning response to user
    return { response: aiResponse.replace(/\[LEAD_CAPTURE:.*?\]/g, '').trim() };
  }

  private async identifyAndSaveLead(userId: string, userMessage: string, aiResponse: string) {
    // Strategy A: Fast path — check for inline [LEAD_CAPTURE] tag first
    const tagMatch = aiResponse.match(/\[LEAD_CAPTURE:\s*(.*?)\]/);
    if (tagMatch) {
      const [name, email, phone] = tagMatch[1].split('|').map(s => s.trim());
      if (name || email || phone) {
        await this.saveLeadToDb(userId, { name, email, phone }, userMessage);
        return;
      }
    }

    // Strategy B: Slow path — use a smaller LLM to extract lead info from conversation
    try {
      const extraction = await this.groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `Analyze the conversation. If the user provided a name, email, or phone number,
            return ONLY a valid JSON object: {"name": "...", "email": "...", "phone": "..."}.
            If no contact info was shared, return exactly the string "NONE". No explanation.`,
          },
          {
            role: 'user',
            content: `User said: ${userMessage}\nAssistant said: ${aiResponse}`,
          },
        ],
        model: 'llama-3-8b-8192', // Smaller, faster model for extraction
      });

      const result = extraction.choices[0]?.message?.content?.trim() ?? 'NONE';
      if (result !== 'NONE') {
        const data = JSON.parse(result);
        await this.saveLeadToDb(userId, data, userMessage);
      }
    } catch (e) {
      console.log('Lead extraction skipped — no parsable data in this turn.');
    }
  }

  private async saveLeadToDb(
    userId: string,
    data: { name?: string; email?: string; phone?: string },
    userMessage: string,
  ) {
    await this.prisma.lead.create({
      data: {
        businessId: userId,
        name: data.name || 'Anonymous',
        email: data.email,
        phoneNumber: data.phone || 'Pending',
        summary: `Captured via Chatbot: ${userMessage}`,
        intent: 'High',
      },
    });
    // TODO: Trigger notification to business owner here
  }
}