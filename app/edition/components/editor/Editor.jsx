"use client"

import "./styles.css";
import Sidebar from "../sidebar/Sidebar";
import { GetCategories } from '@/app/repositories/categories';
import { GetSections } from '@/app/repositories/sections';
import { GetProducts } from '@/app/repositories/products';
import { useEffect, useState } from 'react';


export default function Editor() {
    const [sections, setSections] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchSections = async () => {
            await GetSections()
                .then((response) => {
                    setSections(response.sections);
                    const fetchCategories = async () => {
                        await GetCategories()
                            .then((response) => {
                                setCategories(response.categories);
                                const fetchProducts = async () => {
                                    await GetProducts()
                                        .then((response) => {
                                            setProducts(response.products);
                                            if (sections != []) {
                                                console.log(sections)
                                            }
                                        });
                                };
                                fetchProducts();
                            });
                    };
                    fetchCategories();
                });
        };
        fetchSections();
    }, []);

    const handleMenuItemClick = (sectionId, categoryId) => {
        if (categoryId == null) {
            console.log('Selected section ID:', sectionId);
        } else {
            console.log('Selected section ID:', sectionId);
            console.log('Selected section ID:', categoryId);
        }

    };

    return (
        <>
            {sections != [] ? (
                <div className="flex flex-col h-full">
                    <div className="p-4 text-xl w-full bg-white font-semibold">Productos</div>
                    <div className="flex h-full">
                        <Sidebar className="h-full w-full" onMenuItemClick={handleMenuItemClick} sections={sections} categories={categories} />
                        <div className="flex h-full p-10">
                            Prueba
                        </div>
                    </div>
                </div>

            ) : (
                <div className="">cargando</div>
            )}</>
    );
}