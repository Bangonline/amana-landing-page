import type { Metadata } from "next";
import { Lato } from "next/font/google";
import Script from "next/script";
import { ClientOnlyScript } from "@/components/ClientOnlyScript";
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
      <head />
      <body className={`${lato.variable} font-sans antialiased bg-white text-amana-text-primary`}>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-W83R8V');
            `,
          }}
        />
        
        {/* BugHerd */}
        <Script 
          src="https://www.bugherd.com/sidebarv2.js?apikey=g3fqroxzkhfea0zmen13vg" 
          strategy="afterInteractive"
        />
        
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W83R8V"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ClientOnlyScript />
        {children}
      </body>
    </html>
  );
}
