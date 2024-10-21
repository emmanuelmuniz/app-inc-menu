"use client";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useEffect, useState } from 'react';
import './styles.css';
import { GetSections } from '@/app/services/sections';
import { GetCategories } from '@/app/services/categories';
import { GetProducts } from '@/app/services/products';
import LoadingDisplay from '@/app/components/LoadingDisplay';
import Image from 'next/image'
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
                                <Tab key={section._id} className="tab text-xl bg-ghost-white focus:outline-none cursor-pointer mr-2 mb-2 p-1 px-4 rounded-sm transition">
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
                                                        className="tab text-lg focus:outline-none bg-ghost-white cursor-pointer mr-2 mb-2 p-1 px-4 rounded-sm transition">
                                                        {sectionCategory.name_es}
                                                    </Tab>
                                                ))}
                                        </TabList>
                                        <div className="border-b-1 border-silver w-full"></div>
                                        <div className="text-black grid md:grid-cols-2 gap-3 p-3">
                                            {products
                                                .filter((product) => product.category._id === selectedCategoryId)
                                                .map((product) => (
                                                    <>
                                                        {(product.active) && (
                                                            <div key={product._id} className="bg-white shadow-sm border-1 border-ghost-white rounded-sm overflow-hidden">
                                                                {product.image && product.image.url && (
                                                                    <div className='relative w-full h-64'>
                                                                        <div className='h-full w-full bg-silver animate-pulse'></div>
                                                                        <Image
                                                                            src={product.image.url}
                                                                            alt="Picture of the author"
                                                                            blurDataURL={product.image.url}
                                                                            placeholder="blur"
                                                                            fill={true}
                                                                            draggable="false"
                                                                            className='absolute -mb-10 top-0 left-0 z-2 object-cover transition-opacity opacity-0 duration-[0.4s]'
                                                                            onLoadingComplete={(image) => { image.classList.remove("opacity-0") }}
                                                                            style={{ objectPosition: 'top' }} // Asegura que la parte superior de la imagen sea prioritaria
                                                                        />
                                                                    </div>
                                                                )}

                                                                <div className="p-4">
                                                                    <span className="text-black text-bold text-2xl md:text-xl">
                                                                        <span className="">
                                                                            {product.name_es}
                                                                        </span>
                                                                        {!isNaN(product.price) && product.price > 0 && (
                                                                            <>
                                                                                <span className="mx-2">-</span>
                                                                                <span className="text-inc-light-blue"> ${product.price}</span>
                                                                            </>
                                                                        )}
                                                                    </span>
                                                                    <p className='text-xl md:text-lg mt-2'>{product.description_es}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
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
