import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AppLogo } from '@/components/app-logo';
import { ArrowRight } from 'lucide-react';

export default function WelcomePage() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <div className="relative flex w-full max-w-md flex-col items-center justify-center rounded-2xl border bg-card/80 p-8 text-center shadow-2xl backdrop-blur-sm md:p-12">
        <div className="absolute inset-0 -z-10 rounded-2xl bg-primary/10 opacity-50 blur-3xl"></div>
        
        <AppLogo className="mb-6 h-20 w-20 text-primary" />
        
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Sense Oasis
        </h1>
        
        <p className="mt-4 max-w-xs text-base text-muted-foreground md:text-lg">
          Your personal space for calm and sensory exploration.
        </p>
        
        <Button asChild size="lg" className="mt-8 group transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/30">
          <Link href="/app/dashboard">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
      
      <footer className="absolute bottom-4 text-sm text-muted-foreground">
        Created with peace and tranquility in mind.
      </footer>
    </main>
  );
}
