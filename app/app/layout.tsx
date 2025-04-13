import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hyaline',
  description: 'DeFi has never been this easy',
  authors: {
    name: 'cunnil'
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
