import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { UpdateProductService } from '@/app/edition/services/product/updateProductService/UpdateProductService'
import DeleteProductForm from '@/app/edition/components/product/deleteProductForm/DeleteProductForm';

export default function SectionView({ section, onSectionUpdated, onSectionDeleted, closeModal }) {
    const [nameInputs, setNameInputs] = useState({
        ES: section.name_es,
        EN: section.name_en,
        PT: section.name_pt
    });

    const [descriptionInputs, setDescriptionInputs] = useState({
        ES: section.description_es,
        EN: section.description_en,
        PT: section.description_pt
    });

    const [id, setId] = useState(section._id);
    const [active, setActive] = useState(section.active);

    const [loading, setLoading] = useState(false);

    const handleNameInputChange = (e, language) => {
        setNameInputs({
            ...nameInputs,
            [language]: e.target.value
        });
    };

    const handleDescriptionInputChange = (e, language) => {
        setDescriptionInputs({
            ...descriptionInputs,
            [language]: e.target.value
        });
    };

    const handleSectionDeleted = (e) => {
        onSectionDeleted();
        closeModal();
    };

    const updateSection = async (e) => {
        e.preventDefault();
        setLoading(true);

        let section = {
            name_es: nameInputs.ES,
            name_en: nameInputs.EN,
            name_pt: nameInputs.PT,
            description_es: descriptionInputs.ES,
            description_en: descriptionInputs.EN,
            description_pt: descriptionInputs.PT,
            active: active,
        }

        try {
            const result = await UpdateSectionService({ section, id })
                .then(() => {
                    onSectionUpdated();
                    closeModal();
                    console.log('Section updating result:', result);
                    setLoading(false);
                });

        } catch (error) {
            console.error('Failed to update section:', error);
            setLoading(false);
        }
    }

    return (
        <>
            <div className="w-full newSectionFormModal overflow-y-auto no-scrollbar px-2 bg-white rounded-sm">
                <div className="flex mx-2 pb-4 px-0 pt-4 border-b-1 border-gray place-content-between">
                    <div className='text-center content-center font-semibold'>{section.name_es}</div>
                    <div className="">
                        {/* <DeleteSectionForm
                            section={section}
                            onSectionDeleted={handleSectionDeleted} /> */}
                    </div>
                </div>
                <form className="p-4 w-full" onSubmit={updateSection}>
                    {/* Name Input  */}
                    <div className="flex flex-wrap -mx-2">
                        <div className="w-full px-2 mb-4">
                            <div className="">
                                <Tabs className="principal-tabs w-full" defaultIndex={0}>
                                    <div className="flex place-content-between">
                                        <div className="">
                                            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                Nombre de la categoría
                                            </label>
                                        </div>
                                        <div className="text-right">
                                            <TabList className="text-xs flex text-black mb-2 w-full">
                                                <Tab className="cursor-pointer mx-1 px-1 rounded-sm">ES</Tab>
                                                <Tab className="cursor-pointer mx-1 px-1 rounded-sm">EN</Tab>
                                                <Tab className="cursor-pointer mx-1 px-1 rounded-sm">PT</Tab>
                                            </TabList>
                                        </div>
                                    </div>
                                    <TabPanel>
                                        <input className="text-sm appearance-none block w-full bg-gray-200 border rounded p-2 py-3 leading-tight focus:outline-none focus:bg-white"
                                            type="text"
                                            value={nameInputs.ES}
                                            onChange={(e) => handleNameInputChange(e, 'ES')}
                                            placeholder="Nombre en español"
                                            required
                                        />
                                    </TabPanel>
                                    <TabPanel>
                                        <input className="text-sm appearance-none block w-full bg-gray-200 border rounded p-2 py-3 leading-tight focus:outline-none focus:bg-white"
                                            type="text"
                                            value={nameInputs.EN}
                                            onChange={(e) => handleNameInputChange(e, 'EN')}
                                            placeholder="Nombre en inglés"
                                        />
                                    </TabPanel>
                                    <TabPanel>
                                        <input className="text-sm appearance-none block w-full bg-gray-200 border rounded p-2 py-3 leading-tight focus:outline-none focus:bg-white"
                                            type="text"
                                            value={nameInputs.PT}
                                            onChange={(e) => handleNameInputChange(e, 'PT')}
                                            placeholder="Nombre en portugués"
                                        />
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                    {/* Description Input  */}
                    <div className="w-full mb-3">
                        <Tabs className="principal-tabs w-full" defaultIndex={0}>
                            <div className="flex place-content-between">
                                <div className="">
                                    <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Descripción de la categoría
                                    </label>
                                </div>
                                <div className="text-right">
                                    <TabList className="text-xs flex text-black mb-2 w-full">
                                        <Tab className="cursor-pointer mx-1 px-1 rounded-sm">ES</Tab>
                                        <Tab className="cursor-pointer mx-1 px-1 rounded-sm">EN</Tab>
                                        <Tab className="cursor-pointer mx-1 px-1 rounded-sm">PT</Tab>
                                    </TabList>
                                </div>
                            </div>
                            <TabPanel>
                                <input className="text-sm appearance-none block w-full bg-gray-200 border rounded p-2 py-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    type="text"
                                    value={descriptionInputs.ES}
                                    onChange={(e) => handleDescriptionInputChange(e, 'ES')}
                                    placeholder="Descripción en español"
                                    required
                                />
                            </TabPanel>
                            <TabPanel>
                                <input className="text-sm appearance-none block w-full bg-gray-200 border rounded p-2 py-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    type="text"
                                    value={descriptionInputs.EN}
                                    onChange={(e) => handleDescriptionInputChange(e, 'EN')}
                                    placeholder="Descripción en inglés"
                                />
                            </TabPanel>
                            <TabPanel>
                                <input className="text-sm appearance-none block w-full bg-gray-200 border rounded p-2 py-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    type="text"
                                    value={descriptionInputs.PT}
                                    onChange={(e) => handleDescriptionInputChange(e, 'PT')}
                                    placeholder="Descripción en portugués"
                                />
                            </TabPanel>
                        </Tabs>
                    </div>
                    {/* Category and Published Input  */}
                    <div className="flex flex-wrap -mx-2 mb-4">
                        <div className="w-full px-2 md:mb-0">
                            <div className="w-full">
                                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Estado
                                </label>
                                <div className="relative">
                                    <select
                                        className="text-sm block appearance-none w-full bg-gray-200 border p-2 py-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-state"
                                        required
                                        onChange={(e) => setActive(e.target.value)}
                                        value={active}
                                    >
                                        <option value="status" disabled>
                                            Estado
                                        </option>
                                        <option key="active" value="true" className="text-sm">
                                            Activo
                                        </option>
                                        <option key="inactive" value="false" className="text-sm">
                                            Inactivo
                                        </option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="w-full mb-4">
                            <label className="block text-xs font-bold mb-2">
                                Subir Imagen
                            </label>
                            <input type="file" className="block w-full text-sm file:rounded-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-inc-light-blue file:text-white hover:file:bg-inc-light-blue-hover file:transition file:cursor-pointer" />

                        </div>
                    </div>
                    <div className="w-full text-center mt-7">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`text-white text-sm font-semibold p-2 px-4 rounded-sm ${loading ? 'bg-inc-light-blue opacity-50 cursor-not-allowed' : 'bg-inc-light-blue hover:bg-inc-light-blue-hover'
                                } transition`}
                        >
                            Guardar Categoría
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}