"use client"

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './styles.css'

export default function DigitalMenu() {
    return (
        <>
            <div className="pt-3 w-full">
                <Tabs className="principal-tabs" defaultIndex={0}>
                    <TabList className="flex flex-wrap text-xl text-black mt-2 w-full px-11 pb-3">
                        <Tab className="tab bg-ghost-white cursor-pointer mr-2 mb-2 p-1 px-4 rounded-sm transition">Promos</Tab>
                        <Tab className="tab bg-ghost-white cursor-pointer mr-2 mb-2 p-1 px-4 rounded-sm transition">Café</Tab>
                        <Tab className="tab bg-ghost-white cursor-pointer mr-2 mb-2 p-1 px-4 rounded-sm transition">Matcha</Tab>
                        <Tab className="tab bg-ghost-white cursor-pointer mr-2 mb-2 p-1 px-4 rounded-sm transition">Té</Tab>
                        <Tab className="tab bg-ghost-white cursor-pointer mr-2 mb-2 p-1 px-4 rounded-sm transition">Desayunos / Meriendas y Brunch</Tab>
                        <Tab className="tab bg-ghost-white cursor-pointer mr-2 mb-2 p-1 px-4 rounded-sm transition">Title 2</Tab>
                        <Tab className="tab bg-ghost-white cursor-pointer mr-2 mb-2 p-1 px-4 rounded-sm transition">Title 2</Tab>
                        <Tab className="tab bg-ghost-white cursor-pointer mr-2 mb-2 p-1 px-4 rounded-sm transition">Title 2</Tab>
                        <Tab className="tab bg-ghost-white cursor-pointer mr-2 mb-2 p-1 px-4 rounded-sm transition">Title 2</Tab>
                    </TabList>
                    <div className="w-full">
                        <TabPanel classname="w-full">
                            <Tabs className="w-full secondary-tabs">
                                <TabList className="flex flex-wrap px-11 pb-2">
                                    <Tab className="tab-2 bg-ghost-white cursor-pointer mr-1 mb-1 p-1 px-4 rounded-sm transition">Promos</Tab>
                                    <Tab className="tab-2 bg-ghost-white cursor-pointer mr-1 mb-1 p-1 px-4 rounded-sm transition">Café</Tab>
                                    <Tab className="tab-2 bg-ghost-white cursor-pointer mr-1 mb-1 p-1 px-4 rounded-sm transition">Matcha</Tab>
                                </TabList>
                                <div className="border-b-1 border-silver w-full"></div>
                                <div className="px-11">
                                    <TabPanel className="">
                                        <div className="text-2xl border-b-1 border-silver py-5">
                                            <span className="text-black mr-2">Tortita -
                                                <span className="text-inc-light-blue"> $700</span>
                                            </span>
                                            <p className='text-lg mt-3'>Yogurt natural sin azúcar con granola y miel más frutas de estación</p>
                                        </div>
                                        <div className="text-2xl border-b-1 border-silver py-5">
                                            <span className="text-black mr-2">Medialuna -
                                                <span className="text-inc-light-blue"> $800</span>
                                            </span>
                                            <p className='text-lg mt-3'>Yogurt natural sin azúcar con granola y miel más frutas de estación</p>
                                        </div>
                                        <div className="text-2xl border-b-1 border-silver py-5">
                                            <span className="text-black mr-2">Medialuna -
                                                <span className="text-inc-light-blue"> $800</span>
                                            </span>
                                            <p className='text-lg mt-3'>Yogurt natural sin azúcar con granola y miel más frutas de estación</p>
                                        </div>
                                        <div className="text-2xl border-b-1 border-silver py-5">
                                            <span className="text-black mr-2">Medialuna -
                                                <span className="text-inc-light-blue"> $800</span>
                                            </span>
                                            <p className='text-lg mt-3'>Yogurt natural sin azúcar con granola y miel más frutas de estación</p>
                                        </div>
                                        <div className="text-2xl border-b-1 border-silver py-5">
                                            <span className="text-black mr-2">Medialuna -
                                                <span className="text-inc-light-blue"> $800</span>
                                            </span>
                                            <p className='text-lg mt-3'>Yogurt natural sin azúcar con granola y miel más frutas de estación</p>
                                        </div>
                                        <div className="text-2xl border-b-1 border-silver py-5">
                                            <span className="text-black mr-2">Medialuna -
                                                <span className="text-inc-light-blue"> $800</span>
                                            </span>
                                            <p className='text-lg mt-3'>Yogurt natural sin azúcar con granola y miel más frutas de estación</p>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        content 2
                                    </TabPanel>
                                    <TabPanel>
                                        content 3
                                    </TabPanel>
                                </div>
                            </Tabs>
                        </TabPanel>
                        <TabPanel>
                            <h2>Any content 2</h2>
                        </TabPanel>
                    </div>
                </Tabs>
            </div>
        </>
    )
}