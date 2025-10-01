"use server";

import { generateUserSensoryProfile } from "@/ai/flows/generate-user-sensory-profile";
import { getPersonalizedRecommendations } from "@/ai/flows/personalized-activity-recommendations";
import { generateVideo } from "@/ai/flows/generate-video-flow";
import { z } from "zod";
import { sensoryProfileSchema } from "./lib/schemas";

export async function generateProfileAction(
  values: z.infer<typeof sensoryProfileSchema>
) {
  try {
    const questionnaireResponses = `
      Light Sensitivity: ${values.lightSensitivity}
      Sound Sensitivity: ${values.soundSensitivity}
      Calming Sounds: ${values.calmingSounds.join(", ")}
      Texture Preferences: ${values.texturePreference}
      Preferred Activities: ${values.preferredActivities.join(", ")}
      General Sensitivity: ${values.generalSensitivity}
    `;

    const result = await generateUserSensoryProfile({ questionnaireResponses });
    return { success: true, data: result.sensoryProfile };
  } catch (error) {
    console.error("Error generating sensory profile:", error);
    return { success: false, error: "Failed to generate sensory profile." };
  }
}

export async function getRecommendationsAction(
  sensoryProfile: string,
  preferredActivities: string
) {
  try {
    const result = await getPersonalizedRecommendations({
      sensoryPreferences: sensoryProfile,
      preferredActivities: preferredActivities,
    });
    return { success: true, data: result.recommendations };
  } catch (error) {
    console.error("Error getting recommendations:", error);
    return { success: false, error: "Failed to get recommendations." };
  }
}

export async function generateVideoAction(prompt: string) {
  try {
    const result = await generateVideo({ prompt });
    return { success: true, data: result.videoDataUri };
  } catch (error: any) {
    console.error("Error generating video:", error);
    // Basic error message check. A more robust solution might inspect `error.cause`
    if (error.message && error.message.includes('billing')) {
      return { success: false, error: "Video generation failed. If you're the developer, please ensure your account has active GCP billing." };
    }
    return { success: false, error: "Failed to generate video." };
  }
}
