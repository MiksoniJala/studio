
import Link from "next/link";
import {
  Calendar,
  Home,
  Image as ImageIcon,
  Settings,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
             <svg width="40" height="40" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="58" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="4"/>
                <path d="M40 30 L80 70" stroke="hsl(var(--primary))" strokeWidth="6" strokeLinecap="round"/>
                <path d="M80 30 L40 70" stroke="hsl(var(--primary))" strokeWidth="6" strokeLinecap="round"/>
                <circle cx="50" cy="25" r="10" stroke="hsl(var(--primary))" strokeWidth="5" fill="hsl(var(--card))"/>
                <circle cx="70" cy="25" r="10" stroke="hsl(var(--primary))" strokeWidth="5" fill="hsl(var(--card))"/>
                <path d="M38 72 L30 95" stroke="hsl(var(--primary))" strokeWidth="6" strokeLinecap="round"/>
                <path d="M82 72 L90 95" stroke="hsl(var(--primary))" strokeWidth="6" strokeLinecap="round"/>
            </svg>
            <span className="text-xl font-headline font-semibold group-data-[collapsible=icon]:hidden">Miki Barber</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/admin">
                  <Calendar />
                  Rezervacije
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/admin/barbers">
                  <Users />
                  Berberi
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/admin/gallery">
                  <ImageIcon />
                  Galerija
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/admin/settings">
                  <Settings />
                  Postavke
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <SidebarMenuButton asChild>
                <Link href="/">
                  <Home />
                  Početna Stranica
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
                <h1 className="text-lg font-semibold md:text-xl">Admin Panel</h1>
            </div>
        </header>
        <main className="p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
