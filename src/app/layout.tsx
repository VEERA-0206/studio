
import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'MoDoc - Remote Healthcare',
  description: 'Secure patient-doctor interactions and consultations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Toaster />
        <footer className="border-t bg-white py-8 mt-auto">
          <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
            <p>&copy; {new Date().getFullYear()} MoDoc. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
