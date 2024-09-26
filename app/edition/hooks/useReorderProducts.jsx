import { useCallback } from 'react';

import { UpdateProductsService } from '@/app/edition/services/product/updateProductsService/UpdateProductsService';

const useReorderProducts = (products, setProducts, selectedCategoryId) => {
    const updateDraggedProducts = useCallback(async (productsToUpdate) => {
        try {
            await UpdateProductsService(productsToUpdate); // Asegúrate de importar el servicio correctamente
            console.log('Products updating result');
        } catch (error) {
            console.error('Failed to update products:', error);
        }
    }, []);

    const reorder = useCallback(async (list, startId, endId) => {
        const result = Array.from(list);

        const startIndex = result.findIndex(product => product._id === startId);
        const endIndex = result.findIndex(product => product._id === endId);

        if (startIndex === -1 || endIndex === -1) {
            console.error("No se encontraron los productos a reordenar");
            return list;
        }

        const startProduct = result[startIndex]; // Producto arrastrado (Producto 1)
        const endProduct = result[endIndex];     // Producto destino (Producto 2)

        const originalStartSequence = startProduct.sequence;
        const originalEndSequence = endProduct.sequence;

        // Caso 1: Se mueve hacia adelante en la lista (startIndex < endIndex)
        if (startIndex < endIndex) {
            result.forEach(product => {
                // Decrementar el sequence de los productos entre las posiciones originales de Producto 1 y Producto 2
                if (product.sequence > originalStartSequence && product.sequence <= originalEndSequence) {
                    product.sequence -= 1; // Se decrementa para "hacer espacio" al Producto 1
                }
            });
        }
        // Caso 2: Se mueve hacia atrás en la lista (startIndex > endIndex)
        else if (startIndex > endIndex) {
            result.forEach(product => {
                // Incrementar el sequence de los productos entre la nueva posición de Producto 1 y su posición original
                if (product.sequence >= originalEndSequence && product.sequence < originalStartSequence) {
                    product.sequence += 1; // Se incrementa para "hacer espacio" al Producto 1
                }
            });
        }

        // Asignar el sequence del endProduct al startProduct
        startProduct.sequence = originalEndSequence;

        // Ordenar la lista por el nuevo sequence
        const reorderedProducts = result.sort((a, b) => a.sequence - b.sequence);

        // Actualizar los productos reordenados en la base de datos
        await updateDraggedProducts(reorderedProducts);

        return reorderedProducts;
    }, [updateDraggedProducts]);

    const handleDragEnd = useCallback(async (result) => {
        if (!result.destination) {
            return;
        }

        const filteredProducts = products.filter(product => product.category._id === selectedCategoryId);

        const startId = filteredProducts[result.source.index]._id;
        const endId = filteredProducts[result.destination.index]._id;

        // Reordenar los productos filtrados
        const reorderedFilteredProducts = await reorder(filteredProducts, startId, endId);

        // Actualizar los productos en la lista principal
        const updatedProducts = products.map(product => {
            const updatedProduct = reorderedFilteredProducts.find(p => p._id === product._id);
            return updatedProduct ? updatedProduct : product;
        });

        // Ordenar los productos por su secuencia
        setProducts(updatedProducts.sort((a, b) => a.sequence - b.sequence));
    }, [products, reorder, selectedCategoryId, setProducts]);

    return { handleDragEnd };
};


export default useReorderProducts;
