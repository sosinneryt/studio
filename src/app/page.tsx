import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AppLogo } from '@/components/app-logo';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function WelcomePage() {
  const welcomeImage = PlaceHolderImages.find(img => img.id === 'forest-ambience');

  return (
    <main className="flex min-h-screen w-full flex-col lg:flex-row">
      <div className="relative flex-1 lg:flex-2 order-2 lg:order-1 flex flex-col items-center justify-center p-8">
        <div className="max-w-md w-full">
            <div className="flex items-center gap-3 mb-6">
                <AppLogo className="h-10 w-10 text-primary" />
                <h1 className="font-headline text-2xl font-bold tracking-tight text-foreground">
                    Sense Oasis
                </h1>
            </div>
            
            <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                Find Your Calm
            </h2>
            
            <p className="mt-4 max-w-xs text-lg text-muted-foreground">
                Your personal space for calm and sensory exploration.
            </p>
            
            <Button asChild size="lg" className="mt-8 group transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/30">
                <Link href="/app/dashboard">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
            </Button>
        </div>
        
        <footer className="absolute bottom-4 text-sm text-muted-foreground text-center">
            Created with peace and tranquility in mind.
        </footer>
      </div>

      <div className="relative flex-1 lg:flex-3 order-1 lg:order-2 h-64 lg:h-auto">
        {welcomeImage && (
            <Image
                src={welcomeImage.imageUrl}
                alt={welcomeImage.description}
                fill
                className="object-cover"
                data-ai-hint={welcomeImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent lg:bg-gradient-to-r"></div>
      </div>
    </main>
  );
}
