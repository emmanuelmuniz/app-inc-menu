"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    const [activePath, setActivePath] = useState('/');

    useEffect(() => {
        setActivePath(pathname);
    }, [pathname]);

    return (
        <div className="pt-3 px-4 border-inc-green bg-ghost-white  font-semibold text-lg">
            <ul className="flex gap-6">
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
        </div >
    );
}
