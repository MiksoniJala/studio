
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Home,
  Image as ImageIcon,
  LogOut,
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
import { logoutAction } from "@/lib/auth";

export default function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { [key: string]: string | string[] | undefined };
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Image
                src="/logo.png"
                alt="Miki Barber Shop Logo"
                width={40}
                height={40}
                className="rounded-full"
            />
            <span className="text-xl font-headline font-semibold group-data-[collapsible=icon]:hidden">Miki Barber Shop</span>
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
             <SidebarMenuItem>
               <form action={logoutAction} className="w-full">
                 <SidebarMenuButton type="submit" className="w-full">
                    <LogOut />
                    Odjavi se
                 </SidebarMenuButton>
               </form>
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
