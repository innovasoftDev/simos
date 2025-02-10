import { Footer, Sidebar, TopMenu } from '@/components';
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
      {/* <TopMenu />
      <Sidebar /> */}
      <AppSidebar />
      <Header />
      <main>
        {/* <SidebarTrigger /> */}
        {children}
      </main>
      {/* <Footer /> */}
    </SidebarProvider>
  );
}