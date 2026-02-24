import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scroll-Driven Hero Animation",
  description: "GSAP-powered hero section with smooth scroll interactions."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
