import { Inter, Montserrat_Alternates, Lato } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export const titleFont = Montserrat_Alternates({ 
  subsets: ['latin'],
  weight: ['500', '700'],
});

export const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});