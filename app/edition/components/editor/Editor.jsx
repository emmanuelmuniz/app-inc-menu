"use client"

import "./styles.css";

import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import useReorderProducts from '@/app/edition/hooks/useReorderProducts';

import { useDisclosure } from "@nextui-org/use-disclosure";
import { Modal, ModalContent } from "@nextui-org/modal";

import { GetSections } from '@/app/services/sections';
import { GetCategories } from '@/app/services/categories';
import { GetProducts } from '@/app/services/products';

import LoadingDisplay from '@/app/edition/components/loading/LoadingDisplay';
import CreateProductForm from '@/app/edition/components/product/createProductForm/CreateProductForm';
import ProductView from '@/app/edition/components/product/productView/ProductView';

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function Editor() {
    const [sections, setSections] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { handleDragEnd } = useReorderProducts(products, setProducts, selectedCategoryId);

    const {
        isOpen: isCreateProductFormOpen,
        onOpen: onOpenCreateProductForm,
        onOpenChange: onOpenChangeCreateProductForm } = useDisclosure();

    const {
        isOpen: isProductViewOpen,
        onOpen: onOpenProductView,
        onOpenChange: onOpenChangeProductView } = useDisclosure();

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

    const handleSectionSelect = (sectionId) => {
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
                            className="bg-inc-light-blue p-1 px-3 mx-2 m-1 rounded-sm text-md hover:bg-inc-light-blue-hover transition">
                            Nuevo producto
                        </div>
                        {/* <div className="bg-inc-light-blue p-1 px-3 mx-2 md:mx-1 m-1 md:mr-2 rounded-sm text-md hover:bg-inc-light-blue-hover transition">Reordenar productos</div> */}
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
                                        <Tab key={section._id} className="tab text-md bg-ghost-white cursor-pointer p-2 my-1 rounded-sm transition">
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
                                                            <Tab key={sectionCategory._id} onClick={() => setSelectedCategoryId(sectionCategory._id)} className="w-full text-md tab p-2 my-1 bg-ghost-white cursor-pointer rounded-sm transition">
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
                        <div className=" bg-ghost-white md:w-8/12 mr-2 my-2 rounded-sm md:ml-0 ml-2">
                            <table className='w-full table-auto rounded-t-sm overflow-hidden mb-2'>
                                <thead className='w-full'>
                                    <tr className="text-left bg-inc-light-blue w-full">
                                        <th></th>
                                        <th className="p-2 pl-3 text-white">Producto</th>
                                        <th className="p-2 pl-3 text-white">Precio</th>
                                        <th className="p-2 pl-3 text-white">Descripción</th>
                                        <th className="p-2 pl-3 text-white">Estado</th>
                                    </tr>
                                </thead>
                                <DragDropContext onDragEnd={handleDragEnd}>
                                    <Droppable droppableId="products">
                                        {(droppableProvided) => (
                                            <tbody ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
                                                {products
                                                    .filter(product => product.category._id === selectedCategoryId)
                                                    .map((product, index) => (
                                                        <Draggable key={product._id} draggableId={product._id} index={index}>
                                                            {(provided, snapshot) => (
                                                                <tr
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    onClick={() => setSelectedProduct(product)}
                                                                    className={`max-h-12 text-sm p-2 pl-4 hover:text-inc-light-blue transition odd:bg-silver even:bg-white rounded-none ${snapshot.isDragging ? 'bg-gray-200 dragging' : ''}`}

                                                                >
                                                                    <td>
                                                                        <div className="cursor-grab flex flex-col justify-between w-[25px] h-2 pl-3">
                                                                            <div className="h-[2px] bg-gray-3 rounded"></div>
                                                                            <div className="h-[2px] bg-gray-3 rounded"></div>
                                                                        </div>
                                                                    </td>
                                                                    <td onClick={onOpenProductView} className="cursor-pointer p-2 pl-3">
                                                                        {product.name_es}
                                                                    </td>
                                                                    <td onClick={onOpenProductView} className="cursor-pointer p-2 pl-3">
                                                                        {product.price}
                                                                    </td>
                                                                    <td onClick={onOpenProductView} className="cursor-pointer p-2 pl-3">
                                                                        {product.description_es}
                                                                    </td>
                                                                    <td onClick={onOpenProductView} className="cursor-pointer p-2 pl-3">
                                                                        Activo
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                {droppableProvided.placeholder}
                                            </tbody>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </table>
                        </div>
                    </div>
                )}

                <div className="">
                    <Modal
                        isOpen={isCreateProductFormOpen}
                        onOpenChange={onOpenChangeCreateProductForm}
                        placement="top-center"
                        className="w-full"
                        size={"xl"}
                    >
                        <ModalContent className="modal-content">
                            <>
                                <CreateProductForm
                                    categories={categories}
                                    className="create-product-form"
                                    onProductCreated={handleProductCreated}
                                    closeModal={() => onOpenChangeCreateProductForm(false)} />
                            </>
                        </ModalContent>
                    </Modal>

                    <Modal
                        isOpen={isProductViewOpen}
                        onOpenChange={onOpenChangeProductView}
                        placement="top-center"
                        className=""
                        size={"xl"}
                    >
                        <ModalContent className="modal-content">
                            <>
                                <ProductView
                                    categories={categories}
                                    className="product-view"
                                    onProductUpdated={handleProductUpdated}
                                    onProductDeleted={handleProductDeleted}
                                    product={selectedProduct}
                                    closeModal={() => onOpenChangeProductView(false)} />
                            </>
                        </ModalContent>
                    </Modal>
                </div>
            </div>
        </>
    );
}