import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Star Wars",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ minWidth: '100vw', minHeight: '100vh', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}