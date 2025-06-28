
import Link from "next/link";
import Image from "next/image";
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
             <Image 
                src="data:image/webp;base64,UklGRtIUAABXRUJQVlA4IMSFAABQJgCdASoYChgCPpFGnkulpCMho/M7s/A/iWlu/V7UA/579bvdX+W/2f23+R/wv+P9z/u5+539+/3b1W/vv+j/s/t2+wH+T/xn+B/4X/A/2T9x/8B/r/yL/tf5b/u/yT8kP5N/of7V/w/8R+zH8w/z3/n/4X/Bf2L9oP+P8A/7c/QD/ff6b/y/9l+an/8e6n7u/2X63f4b/Af8p/Zf+F/ev3F/tv+B/y/+d/0X/P/0H/E/3n/i/4L/Pf+R/kv+x/un///93/////7gf7L////7s/AD/v+qf8H/9v5L/////wJ/N//f+zH+//6H+//+r/I/93/8v/////y1+99Pj0l5W4VpC1Y3BSSb44i6lGjXmY2m4zL5wQkUuL3lTjR+79Qk72eEwKx7yScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJyScknJJySckn"
                alt="Miki Barber Shop Logo"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
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
