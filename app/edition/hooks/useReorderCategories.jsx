import { useCallback } from 'react';

import { UpdateCategoriesService } from '@/app/edition/services/category/updateCategoriesService/UpdateCategoriesService';

const useReorderCategories = (categories, setCategories, filteredCategories) => {
    const updateDraggedCategories = useCallback(async (categoriesToUpdate) => {
        try {
            await UpdateCategoriesService(categoriesToUpdate);
            console.log('Categories updating result');
        } catch (error) {
            console.error('Failed to update categories:', error);
        }
    }, []);

    const reorder = useCallback(async (list, startId, endId) => {
        const result = Array.from(list);

        const startIndex = result.findIndex(category => category._id === startId);
        const endIndex = result.findIndex(category => category._id === endId);

        if (startIndex === -1 || endIndex === -1) {
            console.error("No se encontraron las categorías a reordenar");
            return list;
        }

        const startCategory = result[startIndex];
        const endCategory = result[endIndex]

        const originalStartSequence = startCategory.sequence;
        const originalEndSequence = endCategory.sequence;

        if (startIndex < endIndex) {
            result.forEach(category => {
                if (category.sequence > originalStartSequence && category.sequence <= originalEndSequence) {
                    category.sequence -= 1;
                }
            });
        }
        else if (startIndex > endIndex) {
            result.forEach(category => {
                if (category.sequence >= originalEndSequence && category.sequence < originalStartSequence) {
                    category.sequence += 1;
                }
            });
        }

        startCategory.sequence = originalEndSequence;

        const reorderedCategories = result.sort((a, b) => a.sequence - b.sequence);

        await updateDraggedCategories(reorderedCategories);

        return reorderedCategories;
    }, [updateDraggedCategories]);

    const handleDragEndCategories = useCallback(async (result) => {
        if (!result.destination) {
            return;
        }

        const startId = filteredCategories[result.source.index]._id;
        const endId = filteredCategories[result.destination.index]._id;

        const reorderedFilteredCategories = await reorder(filteredCategories, startId, endId);

        const updatedCategories = categories.map(category => {
            const updatedCategory = reorderedFilteredCategories.find(c => c._id === category._id);
            return updatedCategory ? updatedCategory : category;
        });

        setCategories(updatedCategories.sort((a, b) => a.sequence - b.sequence));
    }, [categories, reorder, setCategories]);

    return { handleDragEndCategories };
};

export default useReorderCategories;
