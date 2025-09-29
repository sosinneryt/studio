// src/ai/flows/personalized-activity-recommendations.ts
'use server';

/**
 * @fileOverview Provides personalized activity recommendations based on a user's sensory profile.
 *
 * - `getPersonalizedRecommendations` - A function that takes a sensory profile and returns personalized activity recommendations.
 * - `SensoryProfileInput` - The input type for the `getPersonalizedRecommendations` function, representing the user's sensory profile.
 * - `ActivityRecommendationsOutput` - The return type for the `getPersonalizedRecommendations` function, providing personalized activity recommendations.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the schema for the sensory profile input
const SensoryProfileInputSchema = z.object({
  sensoryPreferences: z
    .string()
    .describe(
      'A detailed description of the user sensory preferences, likes, dislikes, and sensitivities to different sensory inputs such as light, sound, touch, and textures.'
    ),
  preferredActivities: z
    .string()
    .describe(
      'A description of activities that the user generally enjoys and finds relaxing or stimulating.'
    ),
});
export type SensoryProfileInput = z.infer<typeof SensoryProfileInputSchema>;

// Define the schema for the activity recommendations output
const ActivityRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A list of personalized activity recommendations tailored to the user sensory profile and preferred activities.  These activities should be aligned with the core features of the application, such as breathing exercises, soundscapes, light patterns, and sensory toys.'
    ),
});
export type ActivityRecommendationsOutput = z.infer<typeof ActivityRecommendationsOutputSchema>;

// Define the main function to get personalized recommendations
export async function getPersonalizedRecommendations(
  input: SensoryProfileInput
): Promise<ActivityRecommendationsOutput> {
  return personalizedActivityRecommendationsFlow(input);
}

// Define the prompt for generating personalized activity recommendations
const personalizedActivityPrompt = ai.definePrompt({
  name: 'personalizedActivityPrompt',
  input: {schema: SensoryProfileInputSchema},
  output: {schema: ActivityRecommendationsOutputSchema},
  prompt: `Based on the following sensory profile and preferred activities, provide a list of personalized activity recommendations that the user might find helpful for relaxation and sensory regulation.

Sensory Profile: {{{sensoryPreferences}}}
Preferred Activities: {{{preferredActivities}}}

Consider the core features of the application, such as breathing exercises, soundscapes, light patterns, and interactive sensory toys, when making these recommendations. Provide specific examples and suggestions.
`,
});

// Define the Genkit flow for personalized activity recommendations
const personalizedActivityRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedActivityRecommendationsFlow',
    inputSchema: SensoryProfileInputSchema,
    outputSchema: ActivityRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await personalizedActivityPrompt(input);
    return output!;
  }
);
