'use server';
/**
 * @fileOverview A conversational AI health assistant flow.
 *
 * - healthChat - The main function to handle conversational health queries.
 * - HealthChatInput - Input containing the user's message and chat history.
 * - HealthChatOutput - The assistant's response.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MessageSchema = z.object({
  role: z.enum(['user', 'model', 'system']),
  content: z.string(),
});

const HealthChatInputSchema = z.object({
  message: z.string().describe('The user\'s current health-related question or concern.'),
  history: z.array(MessageSchema).optional().describe('Previous messages in the conversation.'),
});
export type HealthChatInput = z.infer<typeof HealthChatInputSchema>;

const HealthChatOutputSchema = z.object({
  text: z.string().describe('The AI\'s response to the user.'),
});
export type HealthChatOutput = z.infer<typeof HealthChatOutputSchema>;

export async function healthChat(input: HealthChatInput): Promise<HealthChatOutput> {
  return healthChatFlow(input);
}

const healthChatFlow = ai.defineFlow(
  {
    name: 'healthChatFlow',
    inputSchema: HealthChatInputSchema,
    outputSchema: HealthChatOutputSchema,
  },
  async (input) => {
    const response = await ai.generate({
      model: 'googleai/gemini-2.0-flash',
      system: `You are MoDoc AI, a friendly and professional health assistant for a medical platform in Tamil Nadu, India.
      Your goal is to help users navigate their health concerns, explain medical concepts simply, and suggest when they should see a specialist.
      
      CRITICAL RULES:
      1. NEVER provide a definitive medical diagnosis.
      2. NEVER prescribe medication.
      3. ALWAYS include a disclaimer if the user describes serious symptoms.
      4. If symptoms sound like an emergency (chest pain, severe bleeding, etc.), tell them to call emergency services (108 in India) immediately.
      5. Mention Coimbatore hospitals (KG Hospital, Ganga Hospital, PSG, KMCH) if relevant to their location.
      
      Keep your tone empathetic, helpful, and concise.`,
      prompt: input.message,
      // history: input.history, // Genkit 1.x handles history through the prompt or specialized chat APIs, 
                                 // for this simple flow we'll use the current message.
    });

    return { text: response.text };
  }
);
