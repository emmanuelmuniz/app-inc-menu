"use client"

import "./styles.css";

import { useEffect, useState } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { useDisclosure } from "@nextui-org/use-disclosure";
import { Modal, ModalContent } from "@nextui-org/modal";

import { GetSections } from '@/app/services/sections';
import { GetCategories } from '@/app/services/categories';
import { GetProducts } from '@/app/services/products';

import LoadingDisplay from '@/app/edition/components/loading/LoadingDisplay';

import SectionView from '@/app/edition/components/section/sectionView/SectionView';
import CategoryView from '@/app/edition/components/category/categoryView/CategoryView';

import CreateSectionForm from '@/app/edition/components/section/createSectionForm/CreateSectionForm';
import CreateCategoryForm from '@/app/edition/components/category/createCategoryForm/CreateCategoryForm';

import { HiOutlinePencilAlt } from "react-icons/hi";

export default function Categories() {
    const [sections, setSections] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState(null);

    const {
        isOpen: isSectionViewOpen,
        onOpen: onOpenSectionView,
        onOpenChange: onOpenChangeSectionView,
    } = useDisclosure();

    const {
        isOpen: isCategoryViewOpen,
        onOpen: onOpenCategoryView,
        onOpenChange: onOpenChangeCategoryView,
    } = useDisclosure();

    const {
        isOpen: isCreateSectionFormOpen,
        onOpen: onOpenCreateSectionForm,
        onOpenChange: onOpenChangeCreateSectionForm,
    } = useDisclosure();

    const {
        isOpen: isCreateCategoryFormOpen,
        onOpen: onOpenCreateCategoryForm,
        onOpenChange: onOpenChangeCreateCategoryForm,
    } = useDisclosure();

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
        await GetProducts().then((response) => {
            setProducts(response.products);
            setLoading(false);
        });
    };

    const loadSections = async () => {
        await GetSections().then((response) => {
            setSections(response.sections);
        });
    };

    const loadCategories = async () => {
        await GetCategories().then((response) => {
            setCategories(response.categories);
        });
    };

    const handleSectionSelect = (sectionId) => {
        const filteredCategories = categories.filter(category => category.section._id === sectionId);

        if (filteredCategories.length > 0) {
            setSelectedCategoryId(filteredCategories[0]._id);
        }
    }

    const handleSectionUpdate = () => {
        loadSections();
    }

    const handleCategoryUpdate = () => {
        loadCategories();
    }

    return (
        <>
            <div className="bg-white h-full w-full md:min-h-[calc(100vh-5.3rem)]">
                {/* <div className="">
                    <div className="p-1 mt-2 ml-3 text-md font-semibold">Categorías</div>
                </div> */}

                {loading ? (
                    <div className="">
                        <LoadingDisplay></LoadingDisplay>
                    </div>
                ) : (

                    <div className="flex flex-col md:flex-row place-content-between bg-white ">
                        <div className="flex md:w-12/12 my-2 md:flex-row w-full">
                            <Tabs className="flex flex-col md:flex-row principal-tabs w-full m-2" defaultIndex={0} onSelect={(index) => handleSectionSelect(sections[index]._id)}>
                                <TabList className="flex-col md:flex-row mb-2 md:w-1/2 md:mb-0 rounded-sm overflow-hidden text-black p-2 mr-2 w-full bg-gray-2">
                                    <div className="flex place-content-between mb-2 font-semibold text-gray-3 items-center">
                                        <div className="">Categorías</div>
                                        <div className="text-right text-white flex items-center whitespace-nowrap 
                                        h-full bg-inc-light-blue px-3 py-2 cursor-pointer mr-0 rounded-sm text-sm hover:bg-inc-light-blue-hover 
                                        transition"
                                            onClick={onOpenCreateSectionForm}>
                                            Nueva Categoría
                                        </div>
                                    </div>

                                    <div className="rounded-sm overflow-hidden w-full">
                                        <div>
                                            <div className="flex p-2 bg-white border-b-2 border-gray rounded-t-sm rounded-b-sm">
                                                <div className="w-1/12 ml-2"></div>
                                                <div className="w-3/12 text-md">Categoría</div>
                                                <div className="w-5/12 text-md">Descripción</div>
                                                <div className="w-2/12 text-md">Estado</div>
                                                <div className="w-1/12 text-md"></div>
                                            </div>
                                        </div>
                                        <div className="rounded-sm overflow-hidden">
                                            {sections.map((section) => (
                                                <Tab key={section._id} className="flex tab text-sm focus:outline-none odd:bg-gray-4 even:bg-white cursor-pointer transition"
                                                    onClick={() => setSelectedSection(section)}>
                                                    <div className="flex w-full px-2 py-2 border-gray-2 border-b-1 border-l-1 border-r-1">
                                                        <div className="w-1/12 ml-2">
                                                            <div className="flex justify-center items-center w-[13px] h-6 cursor-grab">
                                                                <div className="flex flex-col justify-center w-[13px] h-full">
                                                                    <div className="mb-1 h-[2px] bg-gray-3 rounded-"></div>
                                                                    <div className="h-[2px] bg-gray-3 rounded"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="w-3/12 text-sm flex items-center">
                                                            {section.name_es}
                                                        </div>
                                                        <div className="w-5/12 text-sm flex items-center">
                                                            {section.description_es}
                                                        </div>
                                                        <div className="w-2/12 text-sm flex items-center">
                                                            {section.active ? 'Activo' : 'Inactivo'}
                                                        </div>
                                                        <div className="w-1/12 text-sm flex items-center justify-content-center"
                                                            onClick={() => onOpenSectionView()}>
                                                            <HiOutlinePencilAlt className="w-5 h-5" />
                                                        </div>
                                                    </div>
                                                </Tab>
                                            ))}
                                        </div>
                                    </div>
                                </TabList>
                                <div className="w-full rounded-sm bg-gray-2 md:w-1/2 px-2 p-2">
                                    <div className="flex place-content-between mb-2 font-semibold text-gray-3 items-center">
                                        <div className="">Subcategorías</div>
                                        <div className="text-right text-white flex items-center whitespace-nowrap 
                                        h-full bg-inc-light-blue px-3 py-2 cursor-pointer mr-0 rounded-sm text-sm hover:bg-inc-light-blue-hover 
                                        transition"
                                            onClick={onOpenCreateCategoryForm}>
                                            Nueva Subcategoría
                                        </div>
                                    </div>
                                    {sections.map((section) => (
                                        <TabPanel key={section._id} className="w-full">
                                            <Tabs className="w-full secondary-tabs" defaultIndex={0}>
                                                <TabList className="">
                                                    <div className="rounded-sm overflow-hidden">
                                                        <div>
                                                            <div className="flex p-2 bg-white border-b-2 border-gray">
                                                                <div className="w-1/12 ml-2"></div>
                                                                <div className="w-3/12 text-md">Subcategoría</div>
                                                                <div className="w-5/12 text-md">Descripción</div>
                                                                <div className="w-2/12 text-md">Estado</div>
                                                                <div className="w-1/12 text-md"></div>
                                                            </div>
                                                        </div>
                                                        {categories.filter(category => category.section._id === section._id)
                                                            .map((sectionCategory) => (
                                                                <Tab key={sectionCategory._id}
                                                                    onClick={() => setSelectedCategory(sectionCategory)}
                                                                    className="flex w-full tab bg-ghost-white cursor-pointer transition odd:bg-gray-4 even:bg-white">
                                                                    <div className="flex w-full px-2 py-2 border-gray-2 border-b-1 border-l-1 border-r-1">
                                                                        <div className="flex w-1/12 justify-center items-center h-6 mr-2 cursor-grab">
                                                                            <div className="flex flex-col justify-center w-[13px] h-full">
                                                                                <div className="mb-1 h-[2px] bg-gray-3 rounded"></div>
                                                                                <div className="h-[2px] bg-gray-3 rounded"></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="w-3/12 text-sm flex items-center">
                                                                            {sectionCategory.name_es}
                                                                        </div>
                                                                        <div className="w-5/12 text-sm flex items-center">
                                                                            {sectionCategory.description_es}
                                                                        </div>
                                                                        <div className="w-2/12 text-sm flex items-center">
                                                                            {section.active ? 'Activo' : 'Inactivo'}
                                                                        </div>
                                                                        <div className="w-1/12 text-sm flex items-center justify-content-center"
                                                                            onClick={() => onOpenCategoryView()}>
                                                                            <HiOutlinePencilAlt className="w-5 h-5" />
                                                                        </div>
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

                <Modal
                    isOpen={isSectionViewOpen}
                    onOpenChange={onOpenChangeSectionView}
                    placement="top-center"
                    className=""
                    size={"xl"}
                >
                    <ModalContent className="modal-content">
                        <>
                            <SectionView
                                className="section-view"
                                onSectionUpdated={handleSectionUpdate}
                                onSectionDeleted={handleSectionUpdate}
                                section={selectedSection}
                                closeModal={() => onOpenChangeSectionView(false)} />
                        </>
                    </ModalContent>
                </Modal>
                <Modal
                    isOpen={isCategoryViewOpen}
                    onOpenChange={onOpenChangeCategoryView}
                    placement="top-center"
                    className=""
                    size={"xl"}
                >
                    <ModalContent className="modal-content">
                        <>
                            <CategoryView
                                categories={categories}
                                products={products}
                                className="category-view"
                                onCategoryUpdated={handleCategoryUpdate}
                                onCategoryDeleted={handleCategoryUpdate}
                                category={selectedCategory}
                                closeModal={() => onOpenChangeCategoryView(false)} />
                        </>
                    </ModalContent>
                </Modal>
                <Modal
                    isOpen={isCreateSectionFormOpen}
                    onOpenChange={onOpenChangeCreateSectionForm}
                    placement="top-center"
                    className=""
                    size={"xl"}
                >
                    <ModalContent className="modal-content">
                        <>
                            <CreateSectionForm
                                className="create-section-form"
                                onSectionCreated={handleSectionUpdate}
                                closeModal={() => onOpenChangeCreateSectionForm(false)} />
                        </>
                    </ModalContent>
                </Modal>
                <Modal
                    isOpen={isCreateCategoryFormOpen}
                    onOpenChange={onOpenChangeCreateCategoryForm}
                    placement="top-center"
                    className=""
                    size={"xl"}
                >
                    <ModalContent className="modal-content">
                        <>
                            <CreateCategoryForm
                                sections={sections}
                                className="create-category-form"
                                onCategoryCreated={handleCategoryUpdate}
                                closeModal={() => onOpenChangeCreateCategoryForm(false)} />
                        </>
                    </ModalContent>
                </Modal>
            </div>
        </>
    );
}
