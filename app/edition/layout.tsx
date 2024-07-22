import './styles.css';
import Navbar from './components/navbar/Navbar';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="">
                <div className="min-h-screen min-w-screen bg-inc-light-blue">
                    <div className="flex flex-col justify-center px-5 py-0 items-center min-h-screen no-scrollbar font-gratelos">
                        <div className="bg-white rounded shadow-lg w-full
                    sm:min-h-[calc(100vh-2rem)] max-h-[calc(100vh-2.5rem)]
                    sm:rounded sm:shadow-lgh-full min-h-screen overflow-y-auto no-scrollbar relative">
                            <Navbar />

                            <div className='h-full max-h-full'>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html >
    );
}
