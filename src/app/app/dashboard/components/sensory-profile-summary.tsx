"use client";

import Link from "next/link";
import { useSensoryProfile } from "@/hooks/use-sensory-profile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ear, Eye, Hand, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export function SensoryProfileSummary() {
    const { profile, loading } = useSensoryProfile();

    if (loading) {
        return <Skeleton className="h-48 w-full" />;
    }

    if (!profile) {
        return (
            <Card className="flex flex-col items-center justify-center text-center h-48 p-6">
                <CardHeader>
                    <CardTitle>Get a Personalized Experience</CardTitle>
                    <CardDescription>
                        Create your sensory profile to tailor the app just for you.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/app/profile">Create Profile</Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }

    const { preferences } = profile;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Sensory Snapshot</CardTitle>
                <CardDescription>A quick look at your current sensory preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Eye className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">Light Sensitivity</span>
                    </div>
                    <Badge variant="secondary">{preferences.lightSensitivity}/10</Badge>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Ear className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">Sound Sensitivity</span>
                    </div>
                     <Badge variant="secondary">{preferences.soundSensitivity}/10</Badge>
                </div>
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Hand className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">Texture Preference</span>
                    </div>
                     <Badge variant="secondary" className="capitalize">{preferences.texturePreference}</Badge>
                </div>
                 <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium">Calming Sounds</span>
                    </div>
                    <div className="flex flex-wrap gap-1 justify-end max-w-xs">
                        {preferences.calmingSounds.map((sound: string) => (
                             <Badge key={sound} variant="outline" className="capitalize">
                                {sound.replace(/_/g, ' ')}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
