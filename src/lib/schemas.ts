import * as z from "zod";

export const sensoryProfileSchema = z.object({
  lightSensitivity: z.number().min(0).max(10),
  soundSensitivity: z.number().min(0).max(10),
  calmingSounds: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  texturePreference: z.enum(["soft", "rough", "neutral"]),
  preferredActivities: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
  }),
  generalSensitivity: z.string().optional(),
});
