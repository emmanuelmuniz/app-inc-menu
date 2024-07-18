"use client"

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "./styles.css";

export default function Editor() {

    return (
        <>
            <div className="flex">
                <div className="py-3 mr-4 w-1/2">
                    <Tabs className="principal-tabs p-4 rounded-md bg-silver" defaultIndex={0}>
                        <div className="flex">
                            <div className="text-lg p-2 sticky top-0 w-full bg-white rounded-tl-md rounded-bl-md">Categorías</div>
                            <div className="text-lg p-2 sticky top-0 w-full bg-white">Subcategorías</div>
                            <div className="text-lg p-2 sticky top-0 w-full bg-white rounded-tr-md rounded-br-md">Productos</div>
                        </div>
                        <div className='flex'>
                            <div className="w-1/3">
                                <TabList className="flex flex-col text-base w-full pb-3">
                                    <div className="rounded-md mt-1 mr-2 p-1 overflow-y-scroll sections-container">
                                        <Tab className="tab bg-ghost-white cursor-pointer p-2 mt-2 rounded-sm transition duration-300">Todas</Tab>
                                        <Tab className="tab bg-ghost-white cursor-pointer p-2 mt-2 rounded-sm transition duration-300">Promos</Tab>
                                        <Tab className="tab bg-ghost-white cursor-pointer p-2 mt-2 rounded-sm transition duration-300">Café</Tab>
                                        <Tab className="tab bg-ghost-white cursor-pointer p-2 mt-2 rounded-sm transition duration-300">Matcha</Tab>
                                    </div>
                                </TabList>
                            </div>
                            <div className="w-2/3">
                                <TabPanel className="w-full">
                                    <Tabs className="secondary-tabs">
                                        <div className="flex justify-between">
                                            <TabList className="flex flex-col pb-2 w-1/2 text-base">
                                                <div className="bg-silver rounded-md mt-1 mr-2 p-1 overflow-y-scroll categories-container">
                                                    <Tab className="tab bg-ghost-white cursor-pointer p-2 mt-2 rounded-sm transition duration-300">Categoria</Tab>
                                                    <Tab className="tab bg-ghost-white cursor-pointer p-2 mt-2 rounded-sm transition duration-300">Categoria</Tab>
                                                    <Tab className="tab bg-ghost-white cursor-pointer p-2 mt-2 rounded- transition duration-300">Categorias</Tab>
                                                </div>
                                            </TabList>
                                            <TabPanel className="w-1/2 text-lg">
                                                <Tabs className="w-full secondary-tabs">
                                                    <TabList className="flex flex-col pb-2 text-base rounded-md">
                                                        <div className="overflow-y-scroll products-container rounded-md mt-1 mr-2 p-1 w-full">
                                                            <Tab className="tab bg-ghost-white cursor-pointer p-2 mt-2 rounded-sm transition duration-300">Producto</Tab>
                                                            <Tab className="tab bg-ghost-white cursor-pointer p-2 mt-2 rounded-sm transition duration-300">Producto</Tab>
                                                            <Tab className="tab bg-ghost-white cursor-pointer p-2 mt-2 rounded-sm transition duration-300">Producto</Tab>
                                                        </div>
                                                    </TabList>
                                                </Tabs>
                                                <div className="px-11">
                                                    <TabPanel className="">

                                                    </TabPanel>
                                                    <TabPanel>
                                                        content 2
                                                    </TabPanel>
                                                    <TabPanel>
                                                        content 3
                                                    </TabPanel>
                                                </div>
                                            </TabPanel>
                                        </div>
                                    </Tabs>
                                </TabPanel>
                            </div>
                        </div>
                    </Tabs >
                </div >
                <div className="bg-silver editor-container w-1/2 my-3 rounded-md">

                </div>
            </div>
        </>
    );
};