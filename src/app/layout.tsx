import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NumberFormatterProvider } from "./providers/number-formatter/provider";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Parse cookies to get initial locale and currency
  const cookieStore = await cookies();

  const initialLocale = cookieStore.get("locale")?.value;
  const initialCurrency = cookieStore.get("currency")?.value;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NumberFormatterProvider
          initialLocale={initialLocale}
          initialCurrency={initialCurrency}
        >
          {children}
        </NumberFormatterProvider>
      </body>
    </html>
  );
}
