import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { APP_NAME, APP_DESCRIPTION, SERVER_URL } from "@/lib/contants";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: `%s | {APP_NAME}a`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="antialiased">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
