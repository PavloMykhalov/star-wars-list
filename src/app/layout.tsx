import type { Metadata } from "next";
import { Providers } from "./providers";
import { Roboto } from 'next/font/google';

export const metadata: Metadata = {
  title: "Star Wars",
};

const roboto = Roboto({
  subsets: ['latin'],
  weight: "300"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={roboto.className}
        style={{
          margin: 0,
          padding: 0,
          maxWidth: "100vw",
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #141e30, #243b55)",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
