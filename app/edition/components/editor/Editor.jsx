"use client"

import "./styles.css";
import Sidebar from "../sidebar/Sidebar";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { GetCategories } from '@/app/repositories/categories';
import { GetSections } from '@/app/repositories/sections';
import { GetProducts } from '@/app/repositories/products';
import { useEffect, useState } from 'react';


export default function Editor() {
    const [sections, setSections] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);

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

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    return (
        <>
            <div className="w-full bg-ghost-white h-full">
                <div className="w-full bg-white flex place-content-between mb-2">
                    <div className="p-1 my-2 ml-3 text-md font-semibold">Productos</div>
                    <div className="p-1 px-2 my-2 ml-3 mr-3 bg-inc-light-blue text-white font-semibold text-md text-right rounded-sm cursor-pointer">
                        Nuevo producto</div>
                </div>

                <div className="flex bg-ghost-white">
                    <div className="flex w-5/12">
                        <Tabs className="flex principal-tabs w-full ml-4 mb-2" defaultIndex={0} onSelect={(index) => handleCategorySelect(sections[index].categories[0]._id)}>
                            <TabList className="text-lg text-black px-2 mr-2 rounded-sm w-full bg-gray-2">
                                <div className="mt-2 mb-3 font-semibold">Categorías</div>
                                {sections.map((section) => (
                                    <Tab key={section._id} className="tab bg-ghost-white cursor-pointer p-2 my-2 rounded-sm transition">
                                        {section.name_es}
                                    </Tab>
                                ))}
                            </TabList>
                            <div className=" text-lg w-full rounded-sm bg-gray-2 px-2 mr-2">
                                <div className="mt-2 mb-3 font-semibold">Subcategorías</div>
                                {sections.map((section) => (
                                    <TabPanel key={section._id} className="w-full">
                                        <Tabs className="w-full secondary-tabs" defaultIndex={0} onSelect={(index) => handleCategorySelect(section.categories[index]._id)}>
                                            <TabList className="text-lg">
                                                {categories.filter(category => section.categories.map(category => category._id).includes(category._id))
                                                    .map((sectionCategory) => (
                                                        <Tab key={sectionCategory._id} className="w-full tab p-2 my-2 bg-ghost-white cursor-pointer rounded-md transition">
                                                            {sectionCategory.name_es}
                                                        </Tab>
                                                    ))}
                                            </TabList>
                                        </Tabs>
                                    </TabPanel>
                                ))}
                            </div>
                        </Tabs>
                    </div>
                    <div className="bg-ghost-white w-7/12 mr-2 rounded-sm">
                        <table className='w-full table-auto rounded-t-sm overflow-hidden mb-2'>
                            <thead className=''>
                                <tr className="text-left bg-inc-light-blue">
                                    <th className="p-2 pl-4 text-white">Producto</th>
                                    <th className="p-2 pl-4 text-white">Precio</th>
                                    <th className="p-2 pl-4 text-white">Descripción</th>
                                    <th className="p-2 pl-4 text-white">Estado</th>
                                    <th className="p-2 pl-4 text-white text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products
                                    .filter(product => product.category._id === selectedCategory)
                                    .map((product) => (
                                        <tr className="p-2 pl-4 odd:bg-silver even:bg-white rounded-none">
                                            <td className="p-2 pl-4">{product.name_es}</td>
                                            <td className="p-2 pl-4">{product.price}</td>
                                            <td className="p-2 pl-4">{product.description_es}</td>
                                            <td className="p-2 pl-4">Editar / Eliminar   </td>
                                            <td className="text-center p-2 pl-4">Editar / Eliminar   </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    );
}