"use client"

import { useState } from "react";
import Link from 'next/link'

export default function HomeOptions() {

    const [openMenu, setOpenMenu] = useState(false);

    const handleOpenMenu = () => {
        setOpenMenu(true);
        console.log(openMenu)
    }

    return (
        <div className="">
            <div className="grid grid-cols-1">
                <div className="w-full p-10 bg-gray-200 text-center bg-silver">
                    <div className="text-5xl mb-2">Coffee Store</div>
                    <div className="text-2xl">Café de especialidad</div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5 place-content-stretch text-center text-2xl p-1 cursor-pointer">
                <Link href={"/site/menu"}>
                    <div className="py-24 bg-inc-green relative" >
                        Carta Digital
                        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                    </div>
                </Link>
                <a href="https://instagram.com/ineedcoffee.ar" target="_blank" rel="noopener noreferrer">
                    <div className="py-24 bg-inc-light-blue relative">
                        Reservas
                        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                    </div>
                </a>
                <a href="https://maps.app.goo.gl/UEsQRBtapJzteZkB8" target="_blank" rel="noopener noreferrer">
                    <div className="py-24 bg-inc-light-blue relative">
                        Horarios
                        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                    </div>
                </a>
                <div className="py-24 bg-inc-green relative">
                    Merch
                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                </div>
            </div>
            <a href="https://instagram.com/ineedcoffee.ar" target="_blank" rel="noopener noreferrer">
                <div className="grid grid-cols-1 text-center text-xl px-1 cursor-pointer">
                    <div className="w-full px-16 py-16 bg-silver relative">Seguinos en redes sociales y conseguí premios
                        y descuentos especiales pensados para vos.
                        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300">
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
}