"use client"

import "./styles.css";

import { useEffect, useState } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { GetSections } from '@/app/services/sections';
import { GetCategories } from '@/app/services/categories';

import LoadingDisplay from '@/app/edition/components/loading/LoadingDisplay';

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
                    console.log(response.sections)
                    const getCategories = async () => {
                        await GetCategories()
                            .then((response) => {
                                setCategories(response.categories);
                                setSelectedCategoryId(response.categories[0]._id);
                                setLoading(false);
                            });
                    };
                    getCategories();
                });
        };
        getSections();
    }, []);

    const handleSectionSelect = (sectionId) => {
        const filteredCategories = categories.filter(category => category.section._id === sectionId);

        if (filteredCategories.length > 0) {
            setSelectedCategoryId(filteredCategories[0]._id);
        }
    }

    return (
        <>
            <div className="bg-white h-full w-full">
                {/* <div className="">
                    <div className="p-1 mt-2 ml-3 text-md font-semibold">Categorías</div>
                </div> */}

                {loading ? (
                    <div className="">
                        <LoadingDisplay></LoadingDisplay>
                    </div>
                ) : (

                    <div className="flex flex-col md:flex-row place-content-between bg-white">
                        <div className="flex md:w-12/12 my-2 md:flex-row w-full">
                            <Tabs className="flex flex-col md:flex-row principal-tabs w-full m-2" defaultIndex={0} onSelect={(index) => handleSectionSelect(sections[index]._id)}>
                                <TabList className="flex-col md:flex-row mb-2 md:w-1/2 md:mb-0 rounded-sm overflow-hidden text-black p-2 mr-2 w-full bg-gray-2">
                                    <div className="mb-2 font-semibold text-gray-3">Categorías</div>

                                    <div className="rounded-sm overflow-hidden w-full">
                                        <div>
                                            <div className="flex p-2 bg-white border-b-2 border-gray rounded-t-sm">
                                                <div className="w-1/12 ml-2"></div>
                                                <div className="w-3/12 text-md">Categoría</div>
                                                <div className="w-6/12 text-md">Descripción</div>
                                                <div className="w-2/12 text-md">Estado</div>
                                            </div>
                                        </div>
                                        <div>
                                            {sections.map((section) => (
                                                <Tab key={section._id} className="flex tab text-sm px-2 py-1 odd:bg-silver even:bg-white cursor-pointer transition">
                                                    <div className="w-1/12 ml-2">
                                                        <div className="flex justify-center items-center w-[13px] h-6 cursor-grab">
                                                            <div className="flex flex-col justify-center w-[13px] h-full">
                                                                <div className="mb-1 h-[2px] bg-gray-3 rounded-"></div>
                                                                <div className="h-[2px] bg-gray-3 rounded"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-3/12 text-sm">
                                                        {section.name_es}
                                                    </div>
                                                    <div className="w-6/12 text-sm">
                                                        {section.description_es}
                                                    </div>
                                                    <div className="w-2/12 text-sm">
                                                        {section.active ? 'Activo' : 'Inactivo'}
                                                    </div>
                                                </Tab>
                                            ))}
                                        </div>
                                    </div>
                                </TabList>
                                <div className="w-full rounded-sm bg-gray-2 md:w-1/2 px-2 p-2">
                                    <div className="mb-2 font-semibold text-gray-3">Subcategorías</div>
                                    {sections.map((section) => (
                                        <TabPanel key={section._id} className="w-full">
                                            <Tabs className="w-full secondary-tabs" defaultIndex={0}>
                                                <TabList className="">
                                                    <div className="rounded-sm overflow-hidden">
                                                        <div>
                                                            <div className="flex p-2 bg-white border-b-2 border-gray rounded-t-sm">
                                                                <div className="w-1/12 ml-2"></div>
                                                                <div className="w-3/12 text-md">Subcategoría</div>
                                                                <div className="w-6/12 text-md">Descripción</div>
                                                                <div className="w-2/12 text-md">Estado</div>
                                                            </div>
                                                        </div>
                                                        {categories.filter(category => category.section._id === section._id)
                                                            .map((sectionCategory) => (
                                                                <Tab key={sectionCategory._id} onClick={() => setSelectedCategoryId(sectionCategory._id)} className="flex w-full tab px-2 py-1 bg-ghost-white cursor-pointer transition">
                                                                    <div className="flex w-1/12 justify-center items-center h-6 mr-2 cursor-grab">
                                                                        <div className="flex flex-col justify-center w-[13px] h-full">
                                                                            <div className="mb-1 h-[2px] bg-gray-3 rounded"></div>
                                                                            <div className="h-[2px] bg-gray-3 rounded"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="w-3/12 text-sm">
                                                                        {sectionCategory.name_es}
                                                                    </div>
                                                                    <div className="w-6/12 text-sm">
                                                                        {sectionCategory.description_es}
                                                                    </div>
                                                                    <div className="w-2/12 text-sm">
                                                                        {section.active ? 'Activo' : 'Inactivo'}
                                                                    </div>
                                                                </Tab>
                                                            ))}
                                                    </div>
                                                </TabList>
                                            </Tabs>
                                        </TabPanel>
                                    ))}
                                </div>
                            </Tabs>
                            {/* <div className="w-[2px] mx-2 bg-gray h-full"></div> */}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
