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
                <div className="">
                    <div className="p-1 mt-2 ml-3 text-md font-semibold">Categorías</div>
                </div>

                {loading ? (
                    <div className="">
                        <LoadingDisplay></LoadingDisplay>
                    </div>
                ) : (

                    <div className="flex flex-col md:flex-row place-content-between bg-ghost-white h-full">
                        <div className="flex md:w-4/12 my-2 md:flex-row">
                            <Tabs className="flex principal-tabs w-full ml-2" defaultIndex={0} onSelect={(index) => handleSectionSelect(sections[index]._id)}>
                                <TabList className="text-md text-black px-2 mr-2 rounded-sm w-full bg-gray-2">
                                    <div className="mt-2 mb-3 font-semibold">Categorías</div>
                                    {sections.map((section) => (
                                        <Tab key={section._id} className="flex tab text-md bg-ghost-white cursor-pointer p-2 my-1 rounded-sm transition">
                                            <div className="flex justify-center items-center w-[13px] h-6 mr-2 cursor-grab">
                                                <div className="flex flex-col justify-center w-[13px] h-full">
                                                    <div className="mb-1 h-[2px] bg-gray-3 rounded-"></div>
                                                    <div className="h-[2px] bg-gray-3 rounded"></div>
                                                </div>
                                            </div>

                                            {section.name_es}
                                        </Tab>
                                    ))}
                                </TabList>
                                <div className=" text-md w-full rounded-sm bg-gray-2 px-2">
                                    <div className="mt-2 mb-3 font-semibold">Subcategorías</div>
                                    {sections.map((section) => (
                                        <TabPanel key={section._id} className="w-full">
                                            <Tabs className="w-full secondary-tabs" defaultIndex={0}>
                                                <TabList className="text-md">
                                                    {categories.filter(category => category.section._id === section._id)
                                                        .map((sectionCategory) => (
                                                            <Tab key={sectionCategory._id} onClick={() => setSelectedCategoryId(sectionCategory._id)} className="flex w-full text-md tab p-2 my-2 bg-ghost-white cursor-pointer rounded-sm transition">
                                                                <div className="flex justify-center items-center w-[13px] h-6 mr-2 cursor-grab">
                                                                    <div className="flex flex-col justify-center w-[13px] h-full">
                                                                        <div className="mb-1 h-[2px] bg-gray-3 rounded"></div>
                                                                        <div className="h-[2px] bg-gray-3 rounded"></div>
                                                                    </div>
                                                                </div>

                                                                {sectionCategory.name_es}
                                                            </Tab>
                                                        ))}
                                                </TabList>
                                            </Tabs>
                                        </TabPanel>
                                    ))}
                                </div>
                            </Tabs>
                            <div className="w-[2px] mx-2 bg-gray h-full"></div>
                        </div>

                        <div className="flex flex-col md:flex-row md:w-8/12 p-2 pl-0 rounded-sm w-full">
                            <div className="md:w-1/2 w-full h-full flex">
                                <div className="w-full bg-white p-2 rounded-sm">
                                    <div className="border-b-1 pb-1 border-gray">Categoría:</div>
                                </div>
                                <div className="md:text-right w-[2px] mx-2 bg-gray h-full"></div>
                            </div>
                            <div className="md:w-1/2 w-full h-full flex">
                                <div className="w-full bg-white p-2 rounded-sm">
                                    <div className="border-b-1 pb-1 border-gray">Subcategoría:</div>
                                </div>
                                <div className="md:text-right w-[2px] mx-2 bg-gray h-full"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
