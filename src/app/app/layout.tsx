"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wind,
  Music,
  Lightbulb,
  ToyBrick,
  User,
  PanelLeft,
  Gamepad2,
} from "lucide-react";
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { AppLogo } from "@/components/app-logo";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const menuItems = [
  { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/breathing", label: "Breathing", icon: Wind },
  { href: "/app/soundscapes", label: "Soundscapes", icon: Music },
  { href: "/app/light-patterns", label: "Light Patterns", icon: Lightbulb },
  { href: "/app/sensory-toys", label: "Sensory Toys", icon: ToyBrick },
  { href: "/app/games", label: "Games", icon: Gamepad2 },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(isMobile ? false : true);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <Sidebar side="left" collapsible="icon" className="border-r">
        <SidebarContent className="flex flex-col">
          <SidebarHeader className="p-4">
            <Link href="/app/dashboard" className="flex items-center gap-2 font-bold text-lg">
              <AppLogo className="w-8 h-8" />
              <span className="group-data-[collapsible=icon]:hidden">Sense Oasis</span>
            </Link>
          </SidebarHeader>

          <SidebarMenu className="flex-1 p-2">
            {menuItems.map(({ href, label, icon: Icon }) => (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === href}
                  tooltip={{ children: label }}
                >
                  <Link href={href}>
                    <Icon />
                    <span>{label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          
          <SidebarFooter className="p-2">
             <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/app/profile'}
                  tooltip={{ children: "Profile" }}
                >
                  <Link href="/app/profile">
                    <User />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex h-14 items-center gap-2 border-b bg-background/80 backdrop-blur-sm px-4 lg:hidden">
            <SidebarTrigger>
                <PanelLeft />
            </SidebarTrigger>
            <Link href="/app/dashboard" className="flex items-center gap-2 font-bold text-lg">
              <AppLogo className="w-7 h-7" />
              <span >Sense Oasis</span>
            </Link>
        </div>
        <main className="flex-1 p-4 sm:p-6 md:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
