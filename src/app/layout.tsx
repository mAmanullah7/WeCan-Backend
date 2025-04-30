import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SessionProvider from '@/providers/session-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WeCan | Social Welfare Club of NIT Agartala',
  description: 'WeCan is a social welfare club of NIT Agartala, working towards the empowerment of underprivileged children through education.',
  icons: {
    icon: '/images/wecanlogo.png',
    apple: '/images/wecanlogo.png',
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
        <SessionProvider>
          {children}
          <ToastContainer position="bottom-right" />
        </SessionProvider>
      </body>
    </html>
  );
} 