import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import StyledComponentsRegistry from '@/lib/registry';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "悦己—悦健康，悦自在",
  description: "悦己—悦健康，悦自在",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StyledComponentsRegistry>
          <Provider attribute="class" defaultTheme="light">
            <Header />
            {children}
            <Footer />
          </Provider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
