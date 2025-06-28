
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
            <svg width="40" height="40" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-full">
                <circle cx="70" cy="70" r="70" fill="hsl(var(--card))"/>
                <path d="M53.6281 48.7523C52.011 47.1352 50.1132 46 47.9347 46C43.5777 46 40 49.5777 40 53.9347C40 55.7925 40.671 57.5101 41.8123 58.8306L61.5878 78.6061C62.9083 77.4649 64.6259 76.7938 66.4836 76.7938C70.8407 76.7938 74.4184 80.3715 74.4184 84.7285C74.4184 86.8997 73.6199 88.892 72.261 90.3804L90.3804 72.261C88.892 73.6199 86.8997 74.4184 84.7285 74.4184C80.3715 74.4184 76.7938 70.8407 76.7938 66.4836C76.7938 64.6259 77.4649 62.9083 78.6061 61.5878L53.6281 48.7523Z" stroke="hsl(var(--primary))" strokeWidth="4"/>
                <path d="M96.3719 91.2477C97.989 92.8648 99.8868 94 102.065 94C106.422 94 110 90.4223 110 86.0653C110 84.2075 109.329 82.4899 108.188 81.1694L88.4122 61.3939C87.0917 62.5351 85.3741 63.2062 83.5164 63.2062C79.1593 63.2062 75.5816 59.6285 75.5816 55.2715C75.5816 53.1003 76.3801 51.108 77.739 49.6196L59.6196 67.739C61.108 66.3801 63.1003 65.5816 65.2715 65.5816C69.6285 65.5816 73.2062 69.1593 73.2062 73.5164C73.2062 75.3741 72.5351 77.0917 71.3939 78.4122L96.3719 91.2477Z" stroke="hsl(var(--primary))" strokeWidth="4"/>
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
