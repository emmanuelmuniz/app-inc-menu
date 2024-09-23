"use client"

import "./styles.css";

import { useEffect, useState } from 'react';
import { Modal, ModalContent } from "@nextui-org/modal";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { GetCategories } from '@/app/services/categories';
import { GetSections } from '@/app/services/sections';
import { GetProducts } from '@/app/services/products';

import LoadingDisplay from '@/app/edition/components/loading/LoadingDisplay';
import CreateProductForm from '@/app/edition/components/product/createProductForm/CreateProductForm';
import DeleteProductForm from '@/app/edition/components/product/deleteProductForm/DeleteProductForm';
import UpdateProductForm from '@/app/edition/components/product/updateProductForm/UpdateProductForm';

export default function Editor() {
    const [sections, setSections] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const {
        isOpen: isCreateProductFormOpen,
        onOpen: onOpenCreateProductForm,
        onOpenChange: onOpenChangeCreateProductForm } = useDisclosure();

    const {
        isOpen: isUpdateProductFormOpen,
        onOpen: onOpenUpdateProductForm,
        onOpenChange: onOpenChangeUpdateProductForm } = useDisclosure();

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
                                loadProducts();
                            });
                    };
                    getCategories();
                });
        };
        getSections();
    }, []);

    const loadProducts = async () => {
        await GetProducts()
            .then((response) => {
                setProducts(response.products);
                setLoading(false);
            });
    }

    const handleCategorySelect = (categoryId) => {
        setSelectedCategoryId(categoryId);
    }

    const handleSectionSelect = (sectionId) => {
        console.log(sectionId);
        const filteredCategories = categories.filter(category => category.section._id === sectionId);

        if (filteredCategories.length > 0) {
            setSelectedCategoryId(filteredCategories[0]._id);
        }
    }

    const handleProductCreated = () => {
        loadProducts();
    }

    const handleProductUpdated = () => {
        loadProducts();
    }

    const handleProductDeleted = () => {
        loadProducts();
    }

    return (
        <>
            <div className="w-full bg-white h-full">
                <div className="w-full bg-white flex flex-col md:flex-row place-content-between">
                    <div className="p-1 mt-2 ml-3 text-md font-semibold">Productos</div>
                    <div className="font-semibold md:text-right text-white cursor-pointer flex flex-col md:flex-row">
                        <div onClick={onOpenCreateProductForm}
                            className="bg-inc-light-blue p-1 px-3 mx-2 m-1 md:mr-2 rounded-sm text-md hover:bg-inc-light-blue-hover transition">
                            Nuevo producto
                        </div>
                        <div className="bg-inc-light-blue p-1 px-3 mx-2 m-1 md:mr-2 rounded-sm text-md hover:bg-inc-light-blue-hover transition">Reordenar productos</div>
                    </div>
                </div>

                {loading ? (
                    <div className="">
                        <LoadingDisplay></LoadingDisplay>
                    </div>
                ) : (

                    <div className="flex flex-col md:flex-row bg-ghost-white ">
                        <div className="flex md:w-4/12 my-2 md:flex-row">
                            <Tabs className="flex principal-tabs w-full ml-2" defaultIndex={0} onSelect={(index) => handleSectionSelect(sections[index]._id)}>
                                <TabList className="text-md text-black px-2 mr-2 rounded-sm w-full bg-gray-2">
                                    <div className="mt-2 mb-3 font-semibold">Categorías</div>
                                    {sections.map((section) => (
                                        <Tab key={section._id} className="tab text-md font-semibold bg-ghost-white cursor-pointer p-2 my-2 rounded-sm transition">
                                            {section.name_es}
                                        </Tab>
                                    ))}
                                </TabList>
                                <div className=" text-md w-full rounded-sm bg-gray-2 px-2 mr-2">
                                    <div className="mt-2 mb-3 font-semibold">Subcategorías</div>
                                    {sections.map((section) => (
                                        <TabPanel key={section._id} className="w-full">
                                            <Tabs className="w-full secondary-tabs" defaultIndex={0}>
                                                <TabList className="text-md">
                                                    {categories.filter(category => category.section._id === section._id)
                                                        .map((sectionCategory) => (
                                                            <Tab key={sectionCategory._id} onClick={() => setSelectedCategoryId(sectionCategory._id)} className="w-full text-md font-semibold tab p-2 my-2 bg-ghost-white cursor-pointer rounded-sm transition">
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
                        <div className="bg-ghost-white w-8/12 my-2 mr-2 rounded-sm">
                            <table className='w-full max-w-full table-auto rounded-t-sm overflow-hidden mb-2'>
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
                                        .filter(product => product.category._id === selectedCategoryId)
                                        .map((product) => (
                                            <tr onClick={() => setSelectedProduct(product)} key={product._id} className="text-sm p-2 pl-4 hover:text-inc-light-blue transition odd:bg-silver even:bg-white rounded-none">
                                                <td className="p-2 pl-4">{product.name_es}</td>
                                                <td className="p-2 pl-4">{product.price}</td>
                                                <td className="p-2 pl-4">{product.description_es}</td>
                                                <td className="p-2 pl-4">Activo</td>
                                                <td className="h-full text-center place-content-center items-center p-2 pl-4 flex">
                                                    <div
                                                        className="cursor-pointer"
                                                        onClick={onOpenUpdateProductForm}
                                                    >
                                                        Editar</div>
                                                    <div className="mx-2">/

                                                    </div>
                                                    <div className="cursor-pointer">
                                                        <DeleteProductForm
                                                            products={products}
                                                            product={product}
                                                            onProductDeleted={handleProductDeleted} />
                                                    </div>
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
                        isOpen={isCreateProductFormOpen}
                        onOpenChange={onOpenChangeCreateProductForm}
                        placement="top-center"
                        className=""
                    >
                        <ModalContent className="modal-content">
                            <>
                                <CreateProductForm
                                    categories={categories}
                                    className="new-product-form"
                                    onProductCreated={handleProductCreated}
                                    closeModal={() => onOpenChangeCreateProductForm(false)} />
                            </>
                        </ModalContent>
                    </Modal>

                    <Modal
                        isOpen={isUpdateProductFormOpen}
                        onOpenChange={onOpenChangeUpdateProductForm}
                        placement="top-center"
                        className=""
                    >
                        <ModalContent className="modal-content">
                            <>
                                <UpdateProductForm
                                    categories={categories}
                                    className="new-product-form"
                                    onProductUpdated={handleProductCreated}
                                    product={selectedProduct}
                                    closeModal={() => onOpenChangeUpdateProductForm(false)} />
                            </>
                        </ModalContent>
                    </Modal>
                </div>
            </div>
        </>
    );
}