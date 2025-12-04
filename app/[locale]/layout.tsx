import { NextIntlClientProvider, useMessages } from 'next-intl';
import { notFound } from 'next/navigation';
import { inter, cairo } from '../../lib/fonts';
import { cn } from '../../lib/utils';
import type { Metadata } from 'next';
import '../globals.css'; // Ensure this path points to styles/globals.css

export const metadata: Metadata = {
  title: {
    template: '%s | Vysera',
    default: 'Vysera | Modern Jewelry',
  },
  description: 'Editorial jewelry for the modern era. Custom engraved rings, necklaces, and bracelets.',
};

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale (simple check, strictly should utilize i18n config)
  if (!['en', 'ar'].includes(locale)) notFound();

  const messages = useMessages();
  const isRtl = locale === 'ar';

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} className="h-full">
      <body 
        className={cn(
          "h-full font-sans antialiased selection:bg-brand-rose selection:text-white",
          inter.variable,
          cairo.variable
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}