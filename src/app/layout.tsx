import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

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
          width: "100vw",
          height: "100vh",
          background: "#1D1F21",
          backgroundRepeat: "no-repeat",
        }}
      >
        <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
