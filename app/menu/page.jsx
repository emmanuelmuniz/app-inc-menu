"use client";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useEffect, useState } from 'react';
import './styles.css';
import { GetSections } from '@/app/services/sections';
import { GetCategories } from '@/app/services/categories';
import { GetProducts } from '@/app/services/products';
import LoadingDisplay from '@/app/components/LoadingDisplay';

export default function DigitalMenu() {
    const [sections, setSections] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSections = async () => {
            await GetSections()
                .then((response) => {
                    setSections(response.sections);
                    const fetchCategories = async () => {
                        await GetCategories()
                            .then((response) => {
                                setCategories(response.categories);
                                setSelectedCategoryId(response.categories[0]._id)
                                const fetchProducts = async () => {
                                    await GetProducts()
                                        .then((response) => {
                                            setProducts(response.products);
                                            setLoading(false);
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

    const handleSectionSelect = (sectionId) => {
        const filteredCategories = categories.filter(category => category.section._id === sectionId);

        if (filteredCategories.length > 0) {
            setSelectedCategoryId(filteredCategories[0]._id);
        }
    }

    return (
        <>
            {loading ? (
                <div className="">
                    <LoadingDisplay></LoadingDisplay>
                </div>
            ) : (
                <div className="pt-3 w-full min-h-[calc(100vh-5.5rem)]">
                    <Tabs className="principal-tabs" defaultIndex={0} onSelect={(index) => handleSectionSelect(sections[index]._id)}>
                        <TabList className="flex flex-wrap text-xl text-black mt-2 w-full px-11 pb-3">
                            {sections.map((section) => (
                                <Tab key={section._id} className="tab bg-ghost-white focus:outline-none cursor-pointer mr-2 mb-2 p-1 px-4 rounded-sm transition">
                                    {section.name_es}
                                </Tab>
                            ))}
                        </TabList>
                        <div className="w-full">
                            {sections.map((section) => (
                                <TabPanel key={section._id} className="w-full">
                                    <Tabs className="w-full secondary-tabs" defaultIndex={0}>
                                        <TabList className="flex flex-wrap px-11 pb-2">
                                            {categories.filter(category => category.section._id === section._id)
                                                .map((sectionCategory) => (
                                                    <Tab key={sectionCategory._id}
                                                        onClick={() => setSelectedCategoryId(sectionCategory._id)}
                                                        className="tab focus:outline-none bg-ghost-white cursor-pointer mr-2 mb-2 p-1 px-4 rounded-sm transition">
                                                        {sectionCategory.name_es}
                                                    </Tab>
                                                ))}
                                        </TabList>
                                        <div className="border-b-1 border-silver w-full"></div>
                                        <div className="px-11 text-black">
                                            {products
                                                .filter(product => product.category._id === selectedCategoryId)
                                                .map((product) => (
                                                    <div key={product._id} className="text-2xl border-b-1 border-silver py-5">
                                                        <span className="text-black mr-2">
                                                            {product.name_es} -
                                                            <span className="text-inc-light-blue"> ${product.price}</span>
                                                        </span>
                                                        <p className='text-lg mt-3'>{product.description_es}</p>
                                                        {product.image && product.image.url && (
                                                            <img src={product.image.url} alt={product.name_es} />
                                                        )}
                                                    </div>
                                                ))}
                                        </div>
                                    </Tabs>
                                </TabPanel>
                            ))}
                        </div>
                    </Tabs>
                </div>
            )}
        </>
    );
}
