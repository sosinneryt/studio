"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTransition } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { generateProfileAction } from "@/app/actions";
import { useSensoryProfile } from "@/hooks/use-sensory-profile";
import { sensoryProfileSchema } from "@/lib/schemas";
import { Loader, Wand2 } from "lucide-react";

const calmingSounds = [
  { id: "rain", label: "Rain" },
  { id: "waves", label: "Ocean Waves" },
  { id: "nature", label: "Nature Sounds" },
  { id: "white_noise", label: "White Noise" },
  { id: "music", label: "Soft Music" },
];

const preferredActivities = [
  { id: "reading", label: "Reading a book" },
  { id: "walking", label: "Walking in nature" },
  { id: "music_listening", label: "Listening to music" },
  { id: "crafting", label: "Crafting or hobbies" },
  { id: "meditation", label: "Meditation" },
];

export function SensoryProfileForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { profile, saveProfile, clearProfile, loading } = useSensoryProfile();

  const form = useForm<z.infer<typeof sensoryProfileSchema>>({
    resolver: zodResolver(sensoryProfileSchema),
    defaultValues: {
      lightSensitivity: 5,
      soundSensitivity: 5,
      calmingSounds: ["rain"],
      texturePreference: "soft",
      preferredActivities: ["music_listening"],
      generalSensitivity: "",
    },
  });

  function onSubmit(values: z.infer<typeof sensoryProfileSchema>) {
    startTransition(async () => {
      const result = await generateProfileAction(values);
      if (result.success) {
        saveProfile({ text: result.data, preferences: values });
        toast({
          title: "Profile Generated!",
          description: "Your sensory profile has been successfully created.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Generation Failed",
          description: result.error,
        });
      }
    });
  }

  if (loading) {
    return (
      <Card className="flex items-center justify-center h-96">
        <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
      </Card>
    );
  }

  if (profile && !isPending) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="text-primary" />
            Your AI-Generated Profile
          </CardTitle>
          <CardDescription>
            This profile helps us personalize your experience. You can update it anytime.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm dark:prose-invert max-w-none text-card-foreground whitespace-pre-wrap font-body">
            {profile.text}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => clearProfile()} variant="outline">
            Create a New Profile
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="p-6 space-y-8">
            <FormField
              control={form.control}
              name="lightSensitivity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How sensitive are you to bright lights?</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={10}
                      step={1}
                      onValueChange={(value) => field.onChange(value[0])}
                      value={[field.value]}
                    />
                  </FormControl>
                  <FormDescription>0 = Not sensitive, 10 = Very sensitive</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="soundSensitivity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How sensitive are you to loud or sudden noises?</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={10}
                      step={1}
                      onValueChange={(value) => field.onChange(value[0])}
                      value={[field.value]}
                    />
                  </FormControl>
                  <FormDescription>0 = Not sensitive, 10 = Very sensitive</FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="calmingSounds"
              render={() => (
                <FormItem>
                   <FormLabel>Which types of sounds do you find calming?</FormLabel>
                   <div className="grid grid-cols-2 gap-4 pt-2">
                  {calmingSounds.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="calmingSounds"
                      render={({ field }) => (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{item.label}</FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="texturePreference"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Which textures do you generally prefer?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="soft" />
                        </FormControl>
                        <FormLabel className="font-normal">Soft and smooth (like velvet or silk)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="rough" />
                        </FormControl>
                        <FormLabel className="font-normal">Rough and textured (like burlap or sand)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="neutral" />
                        </FormControl>
                        <FormLabel className="font-normal">I don't have a strong preference</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="preferredActivities"
              render={() => (
                <FormItem>
                   <FormLabel>Which of these activities do you find most relaxing?</FormLabel>
                   <div className="grid grid-cols-2 gap-4 pt-2">
                  {preferredActivities.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="preferredActivities"
                      render={({ field }) => (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{item.label}</FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="generalSensitivity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is there anything else about your sensory preferences you'd like to share?</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., 'I dislike strong smells' or 'I enjoy the feeling of weighted blankets'." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Generate My Profile
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
