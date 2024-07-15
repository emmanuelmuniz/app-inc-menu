import React, { useEffect, useRef } from 'react';
import close from '@/public/icons/close.svg';

const NavbarMenu = ({ onClose }) => {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="absolute top-0 right-0 m-4">
                <button onClick={onClose} className="p-2 transform hover:scale-125 transition-transform">
                    <img src={close.src} alt="Icono de Cerrar" className="h-5" />
                </button>
            </div>
            <div className="border-b-2">2</div>
            <div ref={menuRef} className="p-6 relative">
                <div className="text-white text-center text-2xl">
                    <ul>
                        <li className='my-7'>Home</li>
                        <li className='my-7'>Carta Digital</li>
                        <li className='my-7'>Reservas</li>
                        <li className='my-7'>¿Cómo llegar?</li>
                        <li className='my-7'>Instagram</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavbarMenu;
