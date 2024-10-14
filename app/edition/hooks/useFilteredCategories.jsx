import { useState, useEffect } from 'react';

const useFilteredCategories = (categories, selectedSection) => {
    const [filteredCategories, setFilteredCategories] = useState([]);

    useEffect(() => {
        let newFilteredCategories = [];

        if (selectedSection != null && selectedSection._id === "ALL") {
            newFilteredCategories = categories;
        } else {
            if (selectedSection != null) {
                newFilteredCategories = categories.filter((category) => category.section._id === selectedSection._id);
            } else {
                newFilteredCategories = categories;
            }
        }

        setFilteredCategories(newFilteredCategories);
    }, [categories, selectedSection]);

    return filteredCategories;
};

export default useFilteredCategories;
