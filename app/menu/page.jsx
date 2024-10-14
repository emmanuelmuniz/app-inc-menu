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
    const [imageLoading, setImageLoading] = useState(true);

    useEffect(() => {
        const fetchSections = async () => {
            await GetSections()
                .then((response) => {
                    setSections(response.sections);
                    let selectedSection = response.sections[0];
                    const fetchCategories = async () => {
                        await GetCategories()
                            .then((response) => {
                                setCategories(response.categories);
                                handleFirstCategorySelected(response.categories, selectedSection);
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

    const handleFirstCategorySelected = (responseCategories, selectedSection) => {
        console.log(selectedSection);
        const filteredCategories = responseCategories.filter(category => category.section._id === selectedSection._id);

        setSelectedCategoryId(filteredCategories[0]._id);
    }

    useEffect(() => {
        const handleContextMenu = (e) => {
            e.preventDefault();
        };
        document.addEventListener('contextmenu', handleContextMenu);
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    return (
        <>
            {loading ? (
                <div className="">
                    <LoadingDisplay></LoadingDisplay>
                </div>
            ) : (
                <div className="pt-3 w-full min-h-[calc(100vh-5.5rem)]">
                    <Tabs className="principal-tabs" defaultIndex={0} onSelect={(index) => handleSectionSelect(sections[index]._id)}>
                        <TabList className="flex flex-wrap text-xl text-black mt-2 w-full px-5 pb-3">
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
                                        <TabList className="flex flex-wrap px-5 pb-2">
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
                                        <div className="px-5 text-black grid gap-4 md:grid-cols-2">
                                            {products
                                                .filter((product) => product.category._id === selectedCategoryId)
                                                .map((product) => (
                                                    <div key={product._id} className="my-4 shadow-sm rounded-sm overflow-hidden">
                                                        {product.image && product.image.url && (
                                                            <div className='relative w-full h-52'>
                                                                {imageLoading && (
                                                                    <div className='absolute top-0 left-0 h-full w-full bg-silver animate-pulse'></div>
                                                                )}
                                                                <img
                                                                    className={`h-full w-full object-cover transition-opacity duration-500 ${imageLoading ? 'opacity-0' : 'opacity-100'
                                                                        }`}
                                                                    src={product.image.url}
                                                                    alt={product.name_es}
                                                                    onLoad={() => setImageLoading(false)}
                                                                    onContextMenu={(e) => e.preventDefault()}
                                                                    draggable='false'
                                                                />
                                                            </div>
                                                        )}
                                                        <div className="p-4 md:p-2">
                                                            <span className="text-black text-bold text-2xl md:text-lg">
                                                                {product.name_es} -
                                                                <span className="text-inc-light-blue"> ${product.price}</span>
                                                            </span>
                                                            <p className='text-xl md:text-base mt-2'>{product.description_es}</p>
                                                        </div>
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
