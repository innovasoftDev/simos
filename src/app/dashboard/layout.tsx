import KBar from '@/components/kbar';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'SIMOS Dashboard Starter',
  description: 'Basic dashboard'
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Persisting the sidebar state in the cookie.
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';
  return (
    <KBar>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          {/* page main content */}
          {children}
          {/* page main content ends */}
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}



/* import { Footer, Sidebar, TopMenu } from '@/components';
import AppSidebar from '@/components/layout/app-sidebar';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Header from '@/components/layout/header';
import { cookies } from 'next/headers';


export default function ShopLayout( { children }: {
  children: React.ReactNode;
} ) {
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      
      <AppSidebar />
      <Header />
      <main>
        
        {children}
      </main>
      
    </SidebarProvider>
  );
} */