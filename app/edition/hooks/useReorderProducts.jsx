import { useCallback } from 'react';
import { UpdateProductsService } from '@/app/edition/services/product/updateProductsService/UpdateProductsService';

const useReorderProducts = (products, setProducts, filteredProducts) => {
    const updateDraggedProducts = useCallback(async (productsToUpdate) => {
        try {
            await UpdateProductsService(productsToUpdate);
            console.log('Products updated successfully');
        } catch (error) {
            console.error('Failed to update products:', error);
        }
    }, []);

    const reorder = useCallback((list, startId, endId) => {
        const result = Array.from(list);

        const startIndex = result.findIndex(product => product._id === startId);
        const endIndex = result.findIndex(product => product._id === endId);

        if (startIndex === -1 || endIndex === -1) {
            console.error("No se encontraron los productos a reordenar");
            return list;
        }

        const startProduct = result[startIndex];
        const endProduct = result[endIndex];

        const originalStartSequence = startProduct.sequence;
        const originalEndSequence = endProduct.sequence;

        if (startIndex < endIndex) {
            result.forEach(product => {
                if (product.sequence > originalStartSequence && product.sequence <= originalEndSequence) {
                    product.sequence -= 1;
                }
            });
        } else {
            result.forEach(product => {
                if (product.sequence >= originalEndSequence && product.sequence < originalStartSequence) {
                    product.sequence += 1;
                }
            });
        }

        startProduct.sequence = originalEndSequence;

        const reorderedProducts = result.sort((a, b) => a.sequence - b.sequence);

        return reorderedProducts;
    }, []);

    const handleDragEnd = useCallback(async (result) => {
        if (!result.destination) {
            return;
        }

        const startId = filteredProducts[result.source.index]._id;
        const endId = filteredProducts[result.destination.index]._id;

        const reorderedFilteredProducts = reorder(filteredProducts, startId, endId);

        const updatedProducts = products.map(product => {
            const updatedProduct = reorderedFilteredProducts.find(p => p._id === product._id);
            return updatedProduct ? updatedProduct : product;
        });

        setProducts(updatedProducts.sort((a, b) => a.sequence - b.sequence));

        await updateDraggedProducts(updatedProducts);
    }, [products, filteredProducts, reorder, updateDraggedProducts, setProducts]);

    return { handleDragEnd };
};

export default useReorderProducts;
