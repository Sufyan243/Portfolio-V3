import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Syed Muhammad Sufyan — Full Stack Developer & SaaS Builder",
    template: "%s | Sufyan",
  },
  description:
    "Full Stack Developer building real SaaS products. Shipped Terra Debugger, currently building PostIdea. FastAPI, React, Spring Boot, AI integrations. Based in Karachi.",
  openGraph: {
    type: "website",
    url: "https://sufyan.dev",
    siteName: "Sufyan Portfolio",
    title: "Syed Muhammad Sufyan — Full Stack Developer & SaaS Builder",
    description:
      "Full Stack Developer building real SaaS products. Shipped Terra Debugger, currently building PostIdea. FastAPI, React, Spring Boot, AI integrations. Based in Karachi.",
    images: [{ url: "/socail-media-banner.png", width: 1200, height: 630, alt: "Sufyan Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Syed Muhammad Sufyan — Full Stack Developer & SaaS Builder",
    description: "Full Stack Developer building real SaaS products. Shipped Terra Debugger, currently building PostIdea. FastAPI, React, Spring Boot, AI integrations. Based in Karachi.",
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
