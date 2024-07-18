"use client"

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default function Editor() {

    // Datos de prueba
    const data = [
        {
            id: 1,
            sectionName: 'Sección A',
            categories: [
                {
                    id: 11,
                    categoryName: 'Categoría 1A',
                    products: [
                        { id: 111, productName: 'Producto A1' },
                        { id: 112, productName: 'Producto A2' },
                    ]
                },
                {
                    id: 12,
                    categoryName: 'Categoría 2A',
                    products: [
                        { id: 121, productName: 'Producto A3' },
                        { id: 122, productName: 'Producto A4' },
                    ]
                }
            ]
        },
        {
            id: 2,
            sectionName: 'Sección B',
            categories: [
                {
                    id: 21,
                    categoryName: 'Categoría 1B',
                    products: [
                        { id: 211, productName: 'Producto B1' },
                        { id: 212, productName: 'Producto B2' },
                    ]
                },
                {
                    id: 22,
                    categoryName: 'Categoría 2B',
                    products: [
                        { id: 221, productName: 'Producto B3' },
                        { id: 222, productName: 'Producto B4' },
                    ]
                }
            ]
        }
    ];

    return (
        <>
            <div className="grid grid-cols-3">
                <div className="">Secciones</div>
                <div>Categorias</div>
                <div>Productos</div>
            </div>
            <div className="grid grid-cols-3">

            </div>
        </>
    );
};