import { useMemo } from 'react';

const useFilteredProducts = (products, categories, selectedCategoryId, selectedSectionId) => {
    return useMemo(() => {
        if (selectedCategoryId === "ALL") {
            if (selectedSectionId === "ALL") {
                return products; // Retorna todos los productos si no hay filtros
            } else {
                return products.filter((product) => {
                    const category = categories.find((cat) => cat._id === product.category);
                    return category && category.section && category.section._id === selectedSectionId;
                });
            }
        } else {
            return products.filter((product) => product.category === selectedCategoryId);
        }
    }, [products, categories, selectedCategoryId, selectedSectionId]);
};

export default useFilteredProducts;
