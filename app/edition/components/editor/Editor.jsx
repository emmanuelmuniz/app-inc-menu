"use client"

import "./styles.css";

import { useEffect, useState } from 'react';
import { Modal, ModalContent } from "@nextui-org/modal";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { GetCategories } from '@/app/repositories/categories';
import { GetSections } from '@/app/repositories/sections';
import { GetProducts } from '@/app/repositories/products';

import LoadingDisplay from '@/app/edition/components/loading/LoadingDisplay';
import NewProductForm from '@/app/edition/components/newProductForm/NewProductForm';

export default function Editor() {
    const [sections, setSections] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [loading, setLoading] = useState(true);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                                            setLoading(false);
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

            <div className="w-full bg-white h-full">
                <div className="w-full bg-white flex place-content-between mb-2">
                    <div className="p-1 mt-2 ml-3 text-md font-semibold">Productos</div>
                    <div className="font-semibold text-right text-white cursor-pointer flex">
                        <div onClick={onOpen}
                            className="bg-inc-light-blue p-1 px-3 mt-2 ml mr-3 rounded-sm text-md hover:bg-inc-light-blue-hover transition">
                            Nuevo producto
                        </div>
                        <div className="bg-inc-light-blue p-1 px-3 mt-2 ml mr-3 rounded-sm text-md hover:bg-inc-light-blue-hover transition">Reordenar productos</div>
                    </div>
                </div>

                {loading ? (
                    <div className="">
                        <LoadingDisplay></LoadingDisplay>
                    </div>
                ) : (

                    <div className="flex bg-ghost-white ">
                        <div className="flex w-5/12 my-2">
                            <Tabs className="flex principal-tabs w-full ml-4" defaultIndex={0} onSelect={(index) => handleCategorySelect(sections[index].categories[0]._id)}>
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
                                                            <Tab key={sectionCategory._id} className="w-full tab p-2 my-2 bg-ghost-white cursor-pointer rounded-sm transition">
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
                        <div className="bg-ghost-white w-7/12 my-2 mr-2 rounded-sm">
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
                                            <tr className="p-2 pl-4 hover:text-inc-light-blue transition odd:bg-silver even:bg-white rounded-none">
                                                <td className="p-2 pl-4">{product.name_es}</td>
                                                <td className="p-2 pl-4">{product.price}</td>
                                                <td className="p-2 pl-4">{product.description_es}</td>
                                                <td className="p-2 pl-4">Activo</td>
                                                <td className="text-center place-content-center items-center p-2 pl-4 flex">
                                                    <div className="cursor-pointer">Editar</div>
                                                    <div className="mx-2">/</div>
                                                    <div className="cursor-pointer">Eliminar</div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <div className="">
                    <Modal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        placement="top-center"
                        className="sm:min-h-[calc(100vh-10rem)] sm:max-h-[calc(100vh-5rem)]"
                    >
                        <ModalContent className="modal-content">
                            <>
                                <NewProductForm className="new-product-form" />
                            </>
                        </ModalContent>
                    </Modal>
                </div>
            </div>
        </>
    );
}