'use server';
/**
 * @fileOverview This file implements a Genkit flow for an AI-powered symptom assessment tool.
 * It helps patients understand potential doctor specializations or next steps based on their described symptoms,
 * without providing any diagnosis or medical advice.
 *
 * - patientSymptomSpecialtyGuidance - The main function to call the AI flow.
 * - PatientSymptomSpecialtyGuidanceInput - The input type for the flow.
 * - PatientSymptomSpecialtyGuidanceOutput - The output type for the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PatientSymptomSpecialtyGuidanceInputSchema = z.object({
  symptoms: z.string().describe("A description of the patient's symptoms in their own words."),
});
export type PatientSymptomSpecialtyGuidanceInput = z.infer<typeof PatientSymptomSpecialtyGuidanceInputSchema>;

const PatientSymptomSpecialtyGuidanceOutputSchema = z.object({
  specialties: z.array(z.string()).describe('A list of potential doctor specializations that might be relevant.'),
  nextSteps: z.array(z.string()).describe('A list of general, non-diagnostic next steps the patient could take.'),
  disclaimer: z.string().describe('An explicit statement that this is not a medical diagnosis and medical advice should be sought from a professional.'),
});
export type PatientSymptomSpecialtyGuidanceOutput = z.infer<typeof PatientSymptomSpecialtyGuidanceOutputSchema>;

export async function patientSymptomSpecialtyGuidance(input: PatientSymptomSpecialtyGuidanceInput): Promise<PatientSymptomSpecialtyGuidanceOutput> {
  return patientSymptomSpecialtyGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'patientSymptomSpecialtyGuidancePrompt',
  input: {schema: PatientSymptomSpecialtyGuidanceInputSchema},
  output: {schema: PatientSymptomSpecialtyGuidanceOutputSchema},
  prompt: `You are an AI assistant designed to help patients understand potential doctor specializations or general next steps based on their described symptoms. You are NOT a medical professional and must NOT provide a diagnosis, medical advice, or specific treatment recommendations. Your role is solely to guide the user towards appropriate medical consultation or information gathering.

Based on the following symptoms, provide:
1. A list of potential medical specializations a patient might consider consulting.
2. A list of general, non-diagnostic next steps the patient could take.
3. An explicit disclaimer stating that this information is not a medical diagnosis and professional medical advice should be sought.

Symptoms: {{{symptoms}}}`,
});

const patientSymptomSpecialtyGuidanceFlow = ai.defineFlow(
  {
    name: 'patientSymptomSpecialtyGuidanceFlow',
    inputSchema: PatientSymptomSpecialtyGuidanceInputSchema,
    outputSchema: PatientSymptomSpecialtyGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
