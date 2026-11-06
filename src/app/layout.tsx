import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { THEME_BOOTSTRAP_SCRIPT } from "@/lib/theme";
import { siteUrl } from "@/lib/site-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const title = "Buruk Yimesgen — Software Engineer";
const description =
  "Portfolio of Buruk Yimesgen: Salesforce/CRM development, full stack engineering, and data science & quantum research projects.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Buruk Yimesgen",
  },
  description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Buruk Yimesgen",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />
        {/* without JS the entrance animations never run, so un-hide everything they start hidden */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="blur(8px)"]{opacity:1!important;transform:none!important;filter:none!important;mask-image:none!important}#home h1{opacity:1!important}.hero-cover{display:none!important}`}</style>
        </noscript>
        <div className="grain-overlay" aria-hidden="true" />
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
