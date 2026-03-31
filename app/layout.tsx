import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Syed Muhammad Sufyan — Backend Engineer",
    template: "%s | Sufyan",
  },
  description:
    "Backend Engineer specializing in scalable systems, AI integration, and full-stack development. Building robust solutions with Java, PHP, Python, and modern web technologies.",
  openGraph: {
    type: "website",
    url: "https://sufyan.dev",
    siteName: "Sufyan Portfolio",
    title: "Syed Muhammad Sufyan — Backend Engineer",
    description:
      "Backend Engineer specializing in scalable systems, AI integration, and full-stack development.",
    images: [{ url: "/socail-media-banner.png", width: 1200, height: 630, alt: "Sufyan Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Syed Muhammad Sufyan — Backend Engineer",
    description: "Backend Engineer specializing in scalable systems, AI integration, and full-stack development.",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
