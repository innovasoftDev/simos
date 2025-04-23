import { auth } from "@/auth.config";
import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: "%s - SIMOS | Grupo Farinter",
    default: "Home - SIMOS | Grupo Farinter",
  },
  description: "Sistema Monitereo De Servicios",
};

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html
      lang="es"
      className={`${lato.className}`}
      suppressHydrationWarning={true}
    >
      <body className={'overflow-hidden'} suppressHydrationWarning >
        <NextTopLoader showSpinner={false} />
        <Providers session={session}>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}



/* import type { Metadata } from "next";
import { lato } from "@/config/fonts";
import { ThemeProvider } from "@/components/provider/theme-provider";
import "./globals.css";
import Providers from "@/components/layout/providers";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '@/components/ui/sonner';
import { auth } from "@/auth.config";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: {
    template: "%s - SIMOS | Grupo Farinter",
    default: "Home - SIMOS | Grupo Farinter",
  },
  description: "Sistema Monitereo De Servicios",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html
      lang="es"
      className={`${lato.className}`}
      suppressHydrationWarning={true}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body className={'overflow-hidden'}>
          <NextTopLoader showSpinner={false} />
          <Providers session={session}>
            <Toaster />
            {children}
          </Providers>
        </body>
      </ThemeProvider>
    </html>
  );
}
 */