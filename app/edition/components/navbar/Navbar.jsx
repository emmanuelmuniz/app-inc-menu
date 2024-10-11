"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import logoImage from '@/public/icons/Logo_INC-03.svg'

export default function Navbar() {
    const { data: session } = useSession();
    const pathname = usePathname("edition");
    const [activePath, setActivePath] = useState('/');

    useEffect(() => {
        setActivePath(pathname);
    }, [pathname]);

    return (
        <>
            {session && (
                <div className="flex items-center justify-between pt-3 px-4 border-inc-green bg-ghost-white  font-semibold text-lg">
                    <ul className="flex gap-6">
                        <div className="">
                            <img src={logoImage.src} alt="Icono de Instagram" className="h-8 mr-2 ml-1 mt-1 text-sm" />
                        </div>
                        <Link href="/edition"
                            className={`cursor-pointer hover:text-inc-light-blue-hover rounded-t-md pb-3 px-4 pt-2 transition duration-200 ${activePath === '/edition' ? 'text-inc-light-blue bg-white' : ''}`}
                        >
                            Productos
                        </Link>
                        <Link href="/edition/categories"
                            className={`cursor-pointer hover:text-inc-light-blue-hover rounded-t-md pb-3 px-4 pt-2 transition duration-200 ${activePath === '/edition/categories' ? 'text-inc-light-blue bg-white' : ''}`}
                        >
                            Categorías
                        </Link>
                    </ul>
                    <div className="">
                        <div className='p-1 cursor-pointer px-4 rounded-sm text-white text-sm bg-inc-light-blue' onClick={() => signOut()}>
                            Salir
                        </div>
                    </div>
                </div >
            )}
        </>
    );
}
