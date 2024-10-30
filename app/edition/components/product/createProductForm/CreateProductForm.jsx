import "./styles.css";

import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { CreateProductService } from '@/app/edition/services/product/createProductService/CreateProductService'
import { uploadImage, deleteImage } from "@/app/edition/services/image/ImageService";

export default function CreateProductForm({ sections, categories, onProductCreated, closeModal }) {
    const [nameInputs, setNameInputs] = useState({
        ES: '',
        EN: '',
        PT: ''
    });

    const [descriptionInputs, setDescriptionInputs] = useState({
        ES: '',
        EN: '',
        PT: ''
    });

    const [price, setPrice] = useState("");
    const [section, setSection] = useState(null);
    const [category, setCategory] = useState(null);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [active, setActive] = useState("true");
    const [image, setImage] = useState(null);

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

    const handleSectionChange = (e) => {
        const selectedSection = JSON.parse(e.target.value);
        setSection(selectedSection);
        setCategory(null);
        if (selectedSection._id === "ALL") {
            setFilteredCategories(categories);
        } else {
            setFilteredCategories(categories.filter(cat => cat.section._id === selectedSection._id));
        }
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = JSON.parse(e.target.value);
        setCategory(selectedCategory);
    };

    const createProduct = async (e) => {
        e.preventDefault();
        setLoading(true);

        let imageUrl = "";
        let storageRef = "";

        try {
            let imageUrl = "";
            let storagePath = "";

            if (image) {
                const uploadResult = await uploadImage(image, "product");

                imageUrl = uploadResult.imageUrl;
                storagePath = uploadResult.storageRef;
            }

            let product = {
                name_es: nameInputs.ES,
                name_en: nameInputs.EN,
                name_pt: nameInputs.PT,
                price: price,
                description_es: descriptionInputs.ES,
                description_en: descriptionInputs.EN,
                description_pt: descriptionInputs.PT,
                active: active,
                image: {
                    url: imageUrl,
                    storageRef: storagePath
                },
                category: {
                    name_es: category.name_es,
                    name_en: category.name_en,
                    name_pt: category.name_pt,
                    _id: category._id
                }
            };

            const result = await CreateProductService({ product });

            setLoading(false);
            onProductCreated();
            closeModal();
            console.log('Product creation result:', result);
        } catch (error) {
            console.error('Failed to create product:', error);

            if (storagePath) {
                await deleteImage(storagePath);
            }

            setLoading(false);
        }
    }

    return (
        <>
            <div className="newProductFormModal overflow-y-auto no-scrollbar px-3 py-1">
                <div className="m-2 pb-4 pt-2 border-b-1 border-gray">
                    <span className='font-semibold text-md'>Nuevo producto</span>
                </div>
                <form className="p-5 w-full" onSubmit={createProduct}>
                    {/* Name and Price Input  */}
                    <div className="flex flex-wrap -mx-2">
                        <div className="w-full md:w-8/12 px-2 mb-5">
                            <div className="">
                                <Tabs className="principal-tabs w-full" defaultIndex={0}>
                                    <div className="flex place-content-between">
                                        <div className="">
                                            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                Nombre del producto
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
                                        <input className="text-sm appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                            type="text"
                                            value={nameInputs.ES}
                                            onChange={(e) => handleNameInputChange(e, 'ES')}
                                            placeholder="Nombre en español"
                                            required
                                        />
                                    </TabPanel>
                                    <TabPanel>
                                        <input className="text-sm appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                            type="text"
                                            value={nameInputs.EN}
                                            onChange={(e) => handleNameInputChange(e, 'EN')}
                                            placeholder="Nombre en inglés"
                                        />
                                    </TabPanel>
                                    <TabPanel>
                                        <input className="text-sm appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                            type="text"
                                            value={nameInputs.PT}
                                            onChange={(e) => handleNameInputChange(e, 'PT')}
                                            placeholder="Nombre en portugués"
                                        />
                                    </TabPanel>
                                </Tabs>
                            </div>
                        </div>
                        <div className="w-full md:w-4/12 px-2 md:mt-0 mb-5">
                            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Precio
                            </label>
                            <input className="text-sm appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-price" type="text" placeholder="Precio"
                                value={price}
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* Description Input  */}
                    <div className="w-full mb-5">
                        <Tabs className="principal-tabs w-full" defaultIndex={0}>
                            <div className="flex place-content-between">
                                <div className="">
                                    <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Descripción del producto
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
                                <input className="text-sm appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    type="text"
                                    value={descriptionInputs.ES}
                                    onChange={(e) => handleDescriptionInputChange(e, 'ES')}
                                    placeholder="Descripción en español"
                                    required
                                />
                            </TabPanel>
                            <TabPanel>
                                <input className="text-sm appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    type="text"
                                    value={descriptionInputs.EN}
                                    onChange={(e) => handleDescriptionInputChange(e, 'EN')}
                                    placeholder="Descripción en inglés"
                                />
                            </TabPanel>
                            <TabPanel>
                                <input className="text-sm appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    type="text"
                                    value={descriptionInputs.PT}
                                    onChange={(e) => handleDescriptionInputChange(e, 'PT')}
                                    placeholder="Descripción en portugués"
                                />
                            </TabPanel>
                        </Tabs>
                    </div>
                    {/* Category and Published Input  */}
                    <div className="flex flex-wrap -mx-2 mb-5">
                        <div className="w-full md:w-5/12 px-2 md:mb-0">
                            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Categoría
                            </label>
                            <div className="relative">
                                <select
                                    className="text-sm block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    value={section ? JSON.stringify(section) : ''}
                                    onChange={handleSectionChange}
                                    required
                                >
                                    <option value="" disabled>Seleccionar una categoría</option>
                                    {sections.map((section) => (
                                        <option key={section._id} value={JSON.stringify(section)}>
                                            {section.name_es}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-5/12 px-2 md:mb-0">
                            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Subcategoría
                            </label>
                            <div className="relative">
                                <select
                                    className="text-sm block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    value={category ? JSON.stringify(category) : ''}
                                    onChange={handleCategoryChange}
                                    disabled={!section} // Deshabilitar hasta que se seleccione categoría
                                    required
                                >
                                    <option value="" disabled>Seleccionar una subcategoría</option>
                                    {filteredCategories.map((subCat) => (
                                        <option key={subCat._id} value={JSON.stringify(subCat)}>
                                            {subCat.name_es}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-2/12 px-2 md:mb-0">
                            <div className="w-full mb-3">
                                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Estado
                                </label>
                                <div className="relative">
                                    <select
                                        className="text-sm block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                                        </option>                              </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="w-full mb-5">
                            <label className="block text-xs font-bold mb-2">
                                Subir Imagen
                            </label>
                            <input
                                type="file"
                                className="block w-full text-sm file:rounded-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-inc-light-blue file:text-white hover:file:bg-inc-light-blue-hover file:transition file:cursor-pointer"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setImage(file);
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="w-full text-center mt-7">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`text-white text-sm font-semibold p-2 px-4 rounded-sm ${loading ? 'bg-inc-light-blue opacity-50 cursor-not-allowed' : 'bg-inc-light-blue hover:bg-inc-light-blue-hover'
                                } transition`}
                        >
                            Crear Producto
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}