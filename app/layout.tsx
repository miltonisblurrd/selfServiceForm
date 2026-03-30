import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Self-Service Form | Blurrd Studio",
  description: "Select your services and get started with Blurrd Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
