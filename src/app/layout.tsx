import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FUTUREIX | AI, Marketing & Technology Agency | Build. Scale. Dominate.',
  description:
    'Futureix is an Indian digital growth, performance marketing, and technology agency. We engineer custom websites, e-commerce, mobile apps, WhatsApp API automation, and AI workflows.',
  keywords: [
    'Futureix',
    'Futureix Digital Services',
    'Website Development India',
    'Meta Ads Agency',
    'Google Ads India',
    'WhatsApp Business API',
    'AI Automation Agency',
    'Kartik Garhwal',
    'Mritunjay Pratap Singh',
  ],
  authors: [{ name: 'Kartik Garhwal' }, { name: 'Mritunjay Pratap Singh' }],
  metadataBase: new URL('https://futureix.in'),
  openGraph: {
    title: 'FUTUREIX | Build. Scale. Dominate.',
    description: 'Bespoke web development, performance marketing & AI automation solutions.',
    url: 'https://futureix.in',
    siteName: 'FUTUREIX',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#030A16] text-slate-100 antialiased selection:bg-brand-electric-500 selection:text-white">
        <LanguageProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
