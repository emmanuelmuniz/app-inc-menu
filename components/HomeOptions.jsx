"use client"

import { useState } from "react";
import DigitalMenu from "@/components/DigitalMenu"

export default function HomeOptions() {

    const [openMenu, setOpenMenu] = useState(false);

    const handleOpenMenu = () => {
        setOpenMenu(true);
        console.log(openMenu)
    }

    return (
        <div className="">
            {!openMenu ? (
                < div className="" >
                    <div class="grid grid-cols-1">
                        <div className="w-full p-10 bg-gray-200 text-center bg-silver">
                            <div className="text-5xl mb-2">Coffee Store</div>
                            <div className="text-2xl">Café de especialidad</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 place-content-stretch text-center text-2xl p-1 cursor-pointer" onClick={handleOpenMenu}>
                        <div className="py-24 bg-inc-green relative" >
                            Carta Digital
                            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                        </div>
                        <div className="py-24 bg-inc-light-blue relative">
                            Reservas
                            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                        </div>
                        <div className="py-24 bg-inc-light-blue relative">
                            Horarios
                            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                        </div>
                        <div className="py-24 bg-inc-green relative">
                            Merch
                            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 text-center text-xl px-1 cursor-pointer">
                        <div className="w-full px-20 py-16 bg-silver">Seguinos en redes sociales y conseguí premios
                            y descuentos especiales pensados para vos.</div>
                    </div>
                </div >

            ) : (
                <DigitalMenu />
            )}
        </div>
    );
}