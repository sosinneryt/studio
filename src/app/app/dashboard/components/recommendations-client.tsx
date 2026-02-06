"use client";

import { useSensoryProfile } from "@/hooks/use-sensory-profile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader, Wand2 } from "lucide-react";

export function RecommendationsClient() {
  const { profile, loading: profileLoading } = useSensoryProfile();

  if (profileLoading) {
    return (
      <Card className="flex flex-col items-center justify-center h-64">
        <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </Card>
    );
  }

  if (!profile?.text) {
    return (
      <Card className="flex flex-col items-center justify-center text-center h-64 p-6">
        <CardHeader>
          <Wand2 className="h-10 w-10 mx-auto text-primary" />
          <CardTitle className="mt-4">Create a Profile First</CardTitle>
          <CardDescription>
            Complete your sensory profile to unlock personalized AI suggestions.
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
        <p className="text-sm text-muted-foreground">
            AI-powered recommendations are not available in the mobile app version. Please use the web version for this feature.
        </p>
      </CardContent>
    </Card>
  );
}
