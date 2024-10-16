import { useCallback, useState } from 'react';
import { UpdateCategoriesService } from '@/app/edition/services/category/updateCategoriesService/UpdateCategoriesService';

const useReorderCategories = (categories, setCategories, filteredCategories) => {
    const [isUpdating, setIsUpdating] = useState(false);

    const updateDraggedCategories = useCallback(async (categoriesToUpdate) => {
        setIsUpdating(true);
        try {
            await UpdateCategoriesService(categoriesToUpdate);
            console.log('Categories successfully updated in the database');
        } catch (error) {
            console.error('Failed to update categories:', error);
            // Optional: rollback to previous state or notify the user
        } finally {
            setIsUpdating(false);
        }
    }, []);

    const reorder = useCallback((allCategories, startId, endId) => {
        const result = [...allCategories];

        const startIndex = result.findIndex(category => category._id === startId);
        const endIndex = result.findIndex(category => category._id === endId);

        if (startIndex === -1 || endIndex === -1) {
            console.error("No se encontraron las categorías a reordenar");
            return allCategories;
        }

        // Extraemos la categoría que se está moviendo
        const [movedCategory] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, movedCategory);

        // Ajustamos los valores de 'sequence' para que coincidan con el nuevo orden
        return result.map((category, index) => ({
            ...category,
            sequence: index + 1,
        }));
    }, []);

    const handleDragEndCategories = useCallback((result) => {
        if (!result.destination) {
            return;
        }

        const startId = filteredCategories[result.source.index]._id;
        const endId = filteredCategories[result.destination.index]._id;

        const reorderedCategories = reorder(categories, startId, endId);

        setCategories(reorderedCategories);

        updateDraggedCategories(reorderedCategories);
    }, [categories, reorder, filteredCategories, setCategories, updateDraggedCategories]);

    return { handleDragEndCategories, isUpdating };
};

export default useReorderCategories;
