"use client"

import logoImage from '@/public/icons/Logo_INC-03.svg';
import instagramIcon from '@/public/icons/instagram.svg';
import locationIcon from '@/public/icons/location.svg';
import NavbarMenu from '@/components/NavbarMenu'
import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
    const [isChildVisible, setIsChildVisible] = useState(false);

    const handleToggleChild = () => {
        setIsChildVisible(!isChildVisible);
    };

    const handleCloseChild = () => {
        setIsChildVisible(false);
    };

    return (
        <>
            <nav className="p-4 px-8 flex justify-between items-center rounded-t-lg border-silver">
                <div className="flex items-center">
                    <img src={logoImage.src} alt="Icono de Instagram" className="h-10 mx-4 text-sm" />
                </div>

                <div className="flex items-center">
                    <a href="https://www.instagram.com/ineedcoffee.ar" target="_blank" rel="noopener noreferrer" className="text-black text-2xl">
                        <img src={locationIcon.src} alt="Icono de Instagram" className="h-6 mx-3" />
                    </a>

                    <a href="https://www.instagram.com/ineedcoffee.ar" target="_blank" rel="noopener noreferrer" className="text-black text-2xl mr-4">
                        <img src={instagramIcon.src} alt="Icono de Instagram" className="h-6 mx-3" />
                    </a>

                    <div className={`fixed inset-0 bg-black bg-opacity-90 transition-opacity duration-300 ${isChildVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}></div>

                    <button className="text-black text-xl focus:outline-none" onClick={handleToggleChild}>
                        <span className="block w-6 h-0.5 bg-black mb-1.5"></span>
                        <span className="block w-6 h-0.5 bg-black mb-1.5"></span>
                        <span className="block w-6 h-0.5 bg-black"></span>
                    </button>
                </div>

                {isChildVisible && <NavbarMenu onClose={handleCloseChild} />}
            </nav>
        </>
    )
}