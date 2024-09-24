import { useMemo } from 'react';

export const useHandleSectionSelect = (categories, sectionId, setSelectedCategoryId) => {
    return useMemo(() => {
        const filteredCategories = categories.filter(category => category.section._id === sectionId);

        if (filteredCategories.length > 0) {
            return filteredCategories[0]._id;
        }
    });
}