import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { UpdateProductService } from '@/app/edition/services/product/updateProductService/UpdateProductService'

import DeleteProductForm from '@/app/edition/components/product/deleteProductForm/DeleteProductForm';
import { uploadImage, deleteImage } from "@/app/edition/services/image/ImageService";

export default function ProductView({ product, categories, onProductUpdated, onProductDeleted, closeModal }) {
    const [nameInputs, setNameInputs] = useState({
        ES: product.name_es,
        EN: product.name_en,
        PT: product.name_pt
    });

    const [descriptionInputs, setDescriptionInputs] = useState({
        ES: product.description_es,
        EN: product.description_en,
        PT: product.description_pt
    });

    const [id, setId] = useState(product._id);
    const [price, setPrice] = useState(product.price);
    const [category, setCategory] = useState(product.category);
    const [active, setActive] = useState(product.active);
    const [newImage, setNewImage] = useState(null);

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

    const handleCategoryChange = (e) => {
        const selectedCategory = categories.find(category => category._id === e.target.value);
        setCategory(selectedCategory);
    };

    const handleProductDeleted = async (e) => {
        deleteProductImage();
        onProductDeleted();
        closeModal();
    };

    const updateProduct = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { imageUrl, storageRef } = await handleImageUpdate();

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
                storageRef: storageRef
            },
            category: {
                name_es: category.name_es,
                name_en: category.name_en,
                name_pt: category.name_pt,
                _id: category._id
            }
        }

        try {
            await UpdateProductService({ product, id })
                .then(() => {
                    onProductUpdated();
                    closeModal();
                    console.log('Product updating result:', product);
                    setLoading(false);
                });

        } catch (error) {
            console.error('Failed to update product:', error);
            setLoading(false);
        }
    }

    const handleImageUpdate = async () => {
        try {
            if (newImage) {
                deleteProductImage();

                const uploadResult = await uploadImage(newImage, "product");

                return {
                    imageUrl: uploadResult.imageUrl,
                    storageRef: uploadResult.storageRef,
                };
            } else {
                return {
                    imageUrl: product.image?.url || "",
                    storageRef: product.image?.storageRef || "",
                };
            }
        } catch (error) {
            console.error("Error handling image update:", error);
            throw error;
        }
    };

    const deleteProductImage = async () => {
        if (product.image?.storageRef) {
            await deleteImage(product.image.storageRef);
        }
    }

    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            <div className="w-full newProductFormModal overflow-y-auto no-scrollbar px-8 py-1">
                <div className="flex mx-2 pb-4 px-0 pt-4 border-b-1 border-gray place-content-between">
                    <div className='text-center content-center font-semibold'>{product.name_es}</div>
                    <div className="">
                        <DeleteProductForm
                            product={product}
                            onProductDeleted={handleProductDeleted} />
                    </div>
                </div>
                <form className="p-4 px-2 w-full" onSubmit={updateProduct}>
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
                        <div className="w-full md:w-8/12 px-2 md:mb-0">
                            <div className="w-full mb-3 md:mb-0 sm:mb-5">
                                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Categoría
                                </label>
                                <div className="relative">
                                    <select
                                        className="text-sm block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="category-select"
                                        value={category?._id || ''}
                                        onChange={handleCategoryChange}
                                        required
                                    >
                                        <option value="" disabled>
                                            Seleccionar una categoría
                                        </option>

                                        {categories.map((category) => (
                                            <option key={category._id} value={category._id}>
                                                {category.name_es}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-4/12 px-2 md:mb-0">
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
                    <div className="flex justify-between">
                        <div className={`mb-5 ${product.image && product.image.url ? "w-8/12" : "w-full"}`}>
                            <label className="block text-xs font-bold mb-2">
                                Subir Imagen
                            </label>
                            <input
                                type="file"
                                className="block w-full text-sm file:rounded-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-inc-light-blue file:text-white hover:file:bg-inc-light-blue-hover file:transition file:cursor-pointer"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setNewImage(file);
                                    }
                                }}
                            />
                        </div>
                        {product.image && product.image.url && (
                            <div className="w-4/12 flex justify-end flex-row">
                                <div className="">
                                    <div className="">
                                        <label className="block text-xs font-bold mb-2">
                                            Imagen actual
                                        </label>
                                    </div>
                                    <div className='relative w-full h-full'>
                                        {isLoading && (
                                            <div className='absolute top-0 left-0 w-32 h-24 bg-silver animate-pulse rounded-sm'></div>
                                        )}
                                        <img
                                            className={`rounded-sm h-24 w-32 object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'
                                                }`}
                                            src={product.image.url}
                                            alt={product.name_es}
                                            onLoad={() => setIsLoading(false)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="w-full text-center mt-7">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`text-white text-sm font-semibold p-2 px-4 rounded-sm ${loading ? 'bg-inc-light-blue opacity-50 cursor-not-allowed' : 'bg-inc-light-blue hover:bg-inc-light-blue-hover'
                                } transition`}
                        >
                            Guardar Producto
                        </button>

                    </div>
                </form>
            </div>
        </>
    )
}