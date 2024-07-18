import Navbar from "@/app/site/components/Navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <div className="min-h-screen max-w-screen">
                    <div className="flex flex-col justify-center items-center min-h-screen no-scrollbar font-gratelos">
                        <div className="bg-white rounded shadow-lg w-full sm:w-5/12 
                    sm:min-h-[calc(100vh-2.5rem)] sm:max-h-[calc(100vh-2.5rem)]
                    sm:rounded sm:shadow-lgh-full min-h-screen overflow-y-auto no-scrollbar relative">
                            <div className="fixed z-10 bg-white w-full sm:w-5/12 rounded">
                                <Navbar />
                            </div>
                            <div className="mt-[calc(4rem+1px)]">
                                <div className="mt-[calc(4rem+1px)]">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html >
    );
}