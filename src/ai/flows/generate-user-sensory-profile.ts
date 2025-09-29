'use server';
/**
 * @fileOverview Generates a user sensory profile based on questionnaire responses.
 *
 * - generateUserSensoryProfile - A function that takes questionnaire responses and returns a sensory profile.
 * - GenerateUserSensoryProfileInput - The input type for the generateUserSensoryProfile function.
 * - GenerateUserSensoryProfileOutput - The return type for the generateUserSensoryProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateUserSensoryProfileInputSchema = z.object({
  questionnaireResponses: z
    .string()
    .describe('The user responses to the sensory profile questionnaire.'),
});
export type GenerateUserSensoryProfileInput = z.infer<
  typeof GenerateUserSensoryProfileInputSchema
>;

const GenerateUserSensoryProfileOutputSchema = z.object({
  sensoryProfile: z
    .string()
    .describe(
      'A detailed sensory profile generated based on the questionnaire responses.'
    ),
});
export type GenerateUserSensoryProfileOutput = z.infer<
  typeof GenerateUserSensoryProfileOutputSchema
>;

export async function generateUserSensoryProfile(
  input: GenerateUserSensoryProfileInput
): Promise<GenerateUserSensoryProfileOutput> {
  return generateUserSensoryProfileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateUserSensoryProfilePrompt',
  input: {schema: GenerateUserSensoryProfileInputSchema},
  output: {schema: GenerateUserSensoryProfileOutputSchema},
  prompt: `You are an AI assistant designed to generate a sensory profile for a user based on their questionnaire responses.

  Analyze the user's responses to the sensory profile questionnaire and generate a detailed sensory profile, covering areas such as:
  - Sensory sensitivities (e.g., light, sound, touch, smell, taste)
  - Sensory preferences (e.g., preferred types of sounds, colors, textures)
  - Potential sensory triggers (e.g., situations or stimuli that may cause discomfort or overstimulation)
  - Preferred sensory modulation strategies (e.g., activities or techniques that help regulate sensory input)
  
  Questionnaire Responses: {{{questionnaireResponses}}}`,
});

const generateUserSensoryProfileFlow = ai.defineFlow(
  {
    name: 'generateUserSensoryProfileFlow',
    inputSchema: GenerateUserSensoryProfileInputSchema,
    outputSchema: GenerateUserSensoryProfileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
