"use client";

import "./styles.css";

import { useState } from 'react';

import { useDisclosure } from "@nextui-org/use-disclosure";
import { Modal, ModalContent } from "@nextui-org/modal";

import useLoadData from "@/app/edition/hooks/useLoadData";
import useReorderSections from "@/app/edition/hooks/useReorderSections";
import useReorderCategories from "@/app/edition/hooks/useReorderCategories";
import useFilteredCategories from "@/app/edition/hooks/useFilteredCategories";

import LoadingDisplay from '@/app/edition/components/loading/LoadingDisplay';

import SectionView from '@/app/edition/components/section/sectionView/SectionView';
import CategoryView from '@/app/edition/components/category/categoryView/CategoryView';

import CreateSectionForm from '@/app/edition/components/section/createSectionForm/CreateSectionForm';
import CreateCategoryForm from '@/app/edition/components/category/createCategoryForm/CreateCategoryForm';

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { HiOutlinePencilAlt } from "react-icons/hi";

export default function Categories() {
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);

    const [isReordering, setIsReordering] = useState(false);

    const { categories, sections, setCategories, setSections, loadCategories, loadSections, loading }
        = useLoadData(setProducts, "CATEGORIES", setSelectedSection);

    const filteredCategories = useFilteredCategories(categories, selectedSection);

    const { handleDragEnd } = useReorderSections(sections, setSections, setIsReordering);
    const { handleDragEndCategories } = useReorderCategories(categories, setCategories, filteredCategories, selectedSection);

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

    const handleSectionUpdate = () => {
        loadSections();
    }

    const handleCategoryUpdate = () => {
        loadCategories();
    }

    return (
        <>
            <div className="bg-white h-full w-full md:min-h-[calc(100vh-5.3rem)]">
                {loading ? (
                    <div className="">
                        <LoadingDisplay />
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row place-content-between bg-white">
                        <div className="flex flex-col md:w-12/12 my-2 md:flex-row w-full bg-gray-2 p-2 gap-3 overflow-hidden rounded-sm">
                            <div className="flex flex-col md:w-1/2 my-2 overflow-hidden rounded-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="font-semibold text-gray-3">Categorías</h2>
                                    <button
                                        className="bg-inc-light-blue text-white px-3 py-2 rounded-sm hover:bg-inc-light-blue-hover text-sm"
                                        onClick={onOpenCreateSectionForm}
                                    >
                                        Nueva Categoría
                                    </button>
                                </div>
                                <DragDropContext onDragEnd={handleDragEnd}>
                                    <Droppable droppableId="sections">
                                        {(droppableProvided) => (
                                            <div className="bg-white rounded-sm overflow-hidden" ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
                                                <div className="flex p-2 bg-white border-b-2 border-gray rounded-t-sm text-sm">
                                                    <div className="w-1/12 ml-2"></div>
                                                    <div className="w-3/12 text-md">Categoría</div>
                                                    <div className="w-5/12 text-md">Descripción</div>
                                                    <div className="w-2/12 text-md">Estado</div>
                                                    <div className="w-1/12 text-md"></div>
                                                </div>
                                                {sections.map((section, index) => (
                                                    <Draggable key={section._id} draggableId={section._id} index={index} className="cursor-pointer">
                                                        {(provided) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                key={section._id}
                                                                className={`flex tab text-sm focus:outline-none cursor-pointer transition 
                                                                    ${selectedSection._id == section._id ? 'bg-inc-light-blue hover:text-white focus:hover:text-white text-white' : 'even:bg-white odd:bg-gray-4 hover:text-inc-light-blue'}
                                                                    ${isReordering ? 'cursor-wait' : ''}`}
                                                                onClick={() => {
                                                                    setSelectedSection(section);
                                                                    setSelectedCategory(null);
                                                                }}
                                                            >
                                                                <div className="w-1/12 ml-2 p-2">
                                                                    <div className="flex justify-center items-center w-[13px] h-6 cursor-grab">
                                                                        <div className="flex flex-col justify-center w-[13px] h-full">
                                                                            <div className="mb-1 h-[2px] bg-gray-3 rounded-"></div>
                                                                            <div className="h-[2px] bg-gray-3 rounded"></div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="w-3/12 p-2 cursor-pointer flex items-center">{section.name_es}</div>
                                                                <div className="w-5/12 p-2 cursor-pointer flex items-center">{section.description_es}</div>
                                                                <div className="w-2/12 p-2 cursor-pointer flex items-center">{section.active ? 'Activo' : 'Inactivo'}</div>
                                                                <div className="w-1/12 p-2 cursor-pointer flex items-center">
                                                                    <button onClick={onOpenSectionView}>
                                                                        <HiOutlinePencilAlt className="w-5 h-5" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {droppableProvided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </div>

                            <div className="flex flex-col md:w-1/2 my-2 rounded-sm overflow-hidden">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="font-semibold text-gray-3">Subcategorías</h2>
                                    <button
                                        className="bg-inc-light-blue text-white px-3 py-2 rounded-sm hover:bg-inc-light-blue-hover text-sm"
                                        onClick={onOpenCreateCategoryForm}
                                    >
                                        Nueva Subcategoría
                                    </button>
                                </div>
                                <div className="rounded-sm overflow-hidden">
                                    <div className="">
                                        <div className="flex p-2 bg-white border-b-2 border-gray rounded-t-sm text-sm">
                                            <div className="w-1/12 ml-2"></div>
                                            <div className="w-3/12 text-md">Categoría</div>
                                            <div className="w-5/12 text-md">Descripción</div>
                                            <div className="w-2/12 text-md">Estado</div>
                                            <div className="w-1/12 text-md"></div>
                                        </div>
                                    </div>
                                    {selectedSection && (
                                        <DragDropContext onDragEnd={handleDragEndCategories}>
                                            <Droppable droppableId="categories">
                                                {(droppableProvided) => (
                                                    <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps} className="cursor-pointer" >
                                                        {filteredCategories.map((category, index) => (
                                                            <Draggable key={category._id} draggableId={category._id} index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        key={category._id}
                                                                        className="flex text-sm justify-between border-b p-2 cursor-pointer odd:bg-gray-4 even:bg-white border-gray-2"
                                                                        onClick={() => setSelectedCategory(category)}
                                                                    >
                                                                        <div className="w-1/12 ml-2">
                                                                            <div className="flex justify-center items-center w-[13px] h-6 cursor-grab">
                                                                                <div className="flex flex-col justify-center w-[13px] h-full">
                                                                                    <div className="mb-1 h-[2px] bg-gray-3 rounded-"></div>
                                                                                    <div className="h-[2px] bg-gray-3 rounded"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="w-3/12 flex items-center">{category.name_es}</div>
                                                                        <div className="w-5/12 flex items-center">{category.description_es}</div>
                                                                        <div className="w-2/12 flex items-center">{category.active ? 'Activo' : 'Inactivo'}</div>
                                                                        <div className="w-1/12 flex items-center">
                                                                            <button onClick={onOpenCategoryView}>
                                                                                <HiOutlinePencilAlt className="w-5 h-5" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </DragDropContext>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modals for viewing and creating sections and categories */}
                <Modal isOpen={isSectionViewOpen} onOpenChange={onOpenChangeSectionView} size={"3xl"} className="rounded-sm">
                    <ModalContent>
                        <SectionView
                            onSectionUpdated={handleSectionUpdate}
                            onSectionDeleted={handleSectionUpdate}
                            categories={categories}
                            section={selectedSection}
                            closeModal={() => onOpenChangeSectionView(false)}
                        />
                    </ModalContent>
                </Modal>

                <Modal isOpen={isCategoryViewOpen} onOpenChange={onOpenChangeCategoryView} size={"3xl"} className="rounded-sm">
                    <ModalContent>
                        <CategoryView
                            categories={categories}
                            products={products}
                            onCategoryUpdated={handleCategoryUpdate}
                            onCategoryDeleted={handleCategoryUpdate}
                            category={selectedCategory}
                            closeModal={() => onOpenChangeCategoryView(false)}
                        />
                    </ModalContent>
                </Modal>

                <Modal isOpen={isCreateSectionFormOpen} onOpenChange={onOpenChangeCreateSectionForm} size={"3xl"} className="rounded-sm">
                    <ModalContent>
                        <CreateSectionForm
                            onSectionCreated={handleSectionUpdate}
                            closeModal={() => onOpenChangeCreateSectionForm(false)}
                        />
                    </ModalContent>
                </Modal>

                <Modal isOpen={isCreateCategoryFormOpen} onOpenChange={onOpenChangeCreateCategoryForm} size={"3xl"} className="rounded-sm">
                    <ModalContent>
                        <CreateCategoryForm
                            sections={sections}
                            onCategoryCreated={handleCategoryUpdate}
                            closeModal={() => onOpenChangeCreateCategoryForm(false)}
                        />
                    </ModalContent>
                </Modal>
            </div>
        </>
    );
}
