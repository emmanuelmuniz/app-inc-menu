import type { Metadata } from "next";
import localFont from '@next/font/local'
import "./globals.css";
import Navbar from "@/components/Navbar";


const gratelos = localFont({
  src: [
    {
      path: '../public/fonts/AwesomeSerif.ttf',
      weight: '400'
    }
  ],
  variable: '--font-awesome-serif'
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${gratelos.variable} font-sansmono`}>
        {children}
      </body>
    </html >
  );
}
