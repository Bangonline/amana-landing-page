import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Amana Living Retirement Villages",
  description: "Discover luxury retirement living with Amana Living. Find your perfect home in our beautiful retirement villages across Western Australia.",
  keywords: "retirement villages, senior living, aged care, Western Australia, Amana Living",
  authors: [{ name: "Amana Living" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} font-sans antialiased bg-white text-amana-text-primary`}>
        {children}
      </body>
    </html>
  );
}
