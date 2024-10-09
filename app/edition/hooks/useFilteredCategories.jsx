import { useMemo } from 'react';

const useFilteredCategories = (categories, selectedSection) => {
    return useMemo(() => {
        let filteredCategories = [];

        if (selectedSection != null && selectedSection._id === "ALL") {
            filteredCategories = categories;
        } else {
            if (selectedSection != null) {
                filteredCategories = categories.filter((category) => category.section._id === selectedSection._id);
            } else {
                filteredCategories = categories;
            }
        }

        return filteredCategories;
    }, [categories]);
};

export default useFilteredCategories;
