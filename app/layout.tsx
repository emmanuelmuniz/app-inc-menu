import type { Metadata } from "next";
import localFont from '@next/font/local'
import "./globals.css";
import Navbar from "@/app/components/Navbar";

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
  title: "I Need Coffee",
  description: "INC Coffee Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={gratelos.className}>
        <div className="layout-container flex flex-col justify-center items-center min-h-screen no-scrollbar font-gratelos">
          <div className="layout-container-2 bg-white rounded shadow-lg w-full sm:w-5/12 
                    sm:min-h-[calc(100vh-2.5rem)] sm:max-h-[calc(100vh-2.5rem)]
                    sm:rounded sm:shadow-lgh-full min-h-screen overflow-y-auto no-scrollbar relative">
            <div className="fixed z-10 bg-white w-full sm:w-5/12 rounded">
              <Navbar />
            </div>
            <div className="mt-[calc(4rem+1px)] children-div">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html >
  );
}
