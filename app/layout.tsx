import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OMEGA AI Trading Platform",
  description: "Autonomous multi-market trading intelligence dashboard prototype"
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
