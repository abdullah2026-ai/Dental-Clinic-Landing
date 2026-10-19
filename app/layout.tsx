import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'SmileCraft Dental Chamber & Booking Portal',
  description: 'Professional dental chamber booking, patient tracking, and admin dashboard for Bangladeshi dental clinics.',
  openGraph: {
    title: 'SmileCraft Dental Chamber & Booking Portal',
    description: 'Professional dental chamber booking, patient tracking, and admin dashboard for Bangladeshi dental clinics.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmileCraft Dental Chamber & Booking Portal',
    description: 'Professional dental chamber booking, patient tracking, and admin dashboard for Bangladeshi dental clinics.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
