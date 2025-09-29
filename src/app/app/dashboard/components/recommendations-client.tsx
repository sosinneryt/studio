"use client";

import { getRecommendationsAction } from "@/app/actions";
import { useSensoryProfile } from "@/hooks/use-sensory-profile";
import { useEffect, useState, useTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function RecommendationsClient() {
  const { profile, loading: profileLoading } = useSensoryProfile();
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    if (profile) {
      startTransition(async () => {
        const preferredActivities = profile.preferences?.preferredActivities?.join(", ") || "relaxing";
        const result = await getRecommendationsAction(profile.text, preferredActivities);
        if (result.success) {
          setRecommendations(result.data);
        } else {
          toast({
            variant: "destructive",
            title: "Recommendation Error",
            description: result.error,
          });
        }
      });
    }
  }, [profile, toast]);

  if (profileLoading || isPending) {
    return (
      <Card className="flex flex-col items-center justify-center h-64">
        <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="mt-4 text-muted-foreground">Generating recommendations...</p>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card className="flex flex-col items-center justify-center text-center h-64 p-6">
        <CardHeader>
          <Wand2 className="h-10 w-10 mx-auto text-primary" />
          <CardTitle className="mt-4">Unlock Personalized Recommendations</CardTitle>
          <CardDescription>
            Complete your sensory profile to get activities tailored just for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/app/profile">Create My Profile</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalized Suggestions</CardTitle>
        <CardDescription>Based on your unique sensory profile.</CardDescription>
      </CardHeader>
      <CardContent>
        {recommendations ? (
          <div className="prose prose-sm dark:prose-invert max-w-none text-card-foreground">
            {recommendations.split('\n').map((line, index) => {
              if (line.startsWith('* ') || line.startsWith('- ')) {
                return <p key={index} className="flex items-start"><span className="mr-2 mt-1">✨</span><span>{line.substring(2)}</span></p>
              }
              return <p key={index}>{line}</p>
            })}
          </div>
        ) : (
          <p>No recommendations available at the moment.</p>
        )}
      </CardContent>
    </Card>
  );
}
