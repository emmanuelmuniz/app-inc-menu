"use client"

import { useEffect, useState } from 'react';

import { GetSections } from '@/app/services/sections';
import { GetCategories } from '@/app/services/categories';

export default function Categories() {
    const [sections, setSections] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSections = async () => {
            await GetSections()
                .then((response) => {
                    setSections(response.sections);
                    const getCategories = async () => {
                        await GetCategories()
                            .then((response) => {
                                setCategories(response.categories);
                                setSelectedCategoryId(response.categories[0]._id);
                            });
                    };
                    getCategories();
                });
        };
        getSections();
    }, []);

    return (
        <>
            <div className="bg-white h-full w-full">
                <div className="">
                    <div className="p-1 mt-2 ml-3 text-md font-semibold">Categorías</div>
                </div>
                <div className="flex flex-col md:flex-row place-content-between bg-white h-full">
                    <div className="">

                    </div>
                    <div className="">

                    </div>
                </div>
            </div>
        </>
    );
}
