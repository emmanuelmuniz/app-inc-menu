import './styles.css';
import Navbar from './components/navbar/Navbar';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className='p-0 '>
            <div className="bg-ghost-white sm:min-h-[calc(100vh-2.5rem)] sm:max-h-[calc(100vh-2.5rem)]
             rounded shadow-lg h-full w-full sm:rounded sm:shadow-lgh-full overflow-y-auto no-scrollbar relative">
                <div className="">
                    <Navbar></Navbar>
                </div>
                <div className='h-full max-h-full'>
                    {children}
                </div>
            </div>
        </section>
    );
}
