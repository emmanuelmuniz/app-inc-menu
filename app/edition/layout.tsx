import './styles.css';
import Navbar from './components/navbar/Navbar';
import SessionProviderClientComponent from './components/authProvider/AuthProvider'
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await getServerSession();

    return (
        <section className={"bg-ghost-white p-0" + inter.className}>
            <div className={"bg-ghost-white sm:min-h-[calc(100vh-2.5rem)] sm:max-h-[calc(100vh-2.5rem)]" +
                "rounded shadow-lg h-full w-full sm:rounded sm:shadow-lgh-full overflow-y-auto no-scrollbar relative" + inter.className}>
                <SessionProviderClientComponent session={session}>
                    <div className={"bg-ghost-white p-0" + inter.className}>
                        <Navbar></Navbar>
                    </div>
                    <div className={"h-full max-h-full bg-ghost-white p-0" + inter.className}>
                        {children}
                    </div>
                </SessionProviderClientComponent>
            </div>
        </section>
    );
}

export const interStyle = inter.style.fontFamily;
