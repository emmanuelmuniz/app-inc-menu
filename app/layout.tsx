import type { Metadata } from "next";
import localFont from '@next/font/local'
import "./globals.css";
import Navbar from "@/app/components/navbar/Navbar";

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
        <div className="layout-container relative flex flex-col justify-center items-center 
                        bg-[url('/images/inc-front.jpeg')] bg-fixed bg-contain h-screen
                        min-h-screen no-scrollbar font-gratelos no-select">
          <div className="absolute inset-0 bg-inc-light-blue opacity-15"></div>
          <div className="layout-container-2 relative z-10 bg-white rounded shadow-lg w-full sm:w-6/12 
                    sm:min-h-[calc(100vh-1.5rem)] sm:max-h-[calc(100vh-2.5rem)]
                    sm:rounded sm:shadow-lg h-full min-h-screen overflow-y-auto no-scrollbar">
            <div className="fixed z-10 bg-white w-full sm:w-6/12 rounded">
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
