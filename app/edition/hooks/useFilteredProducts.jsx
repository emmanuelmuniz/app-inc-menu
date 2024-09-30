import { useMemo } from 'react';

const useFilteredProducts = (products, categories, selectedCategoryId, selectedSectionId, searchFilter) => {
    return useMemo(() => {
        let filteredProducts = [];

        // Filtrar productos según la categoría y la sección seleccionadas
        if (selectedCategoryId === "ALL") {
            if (selectedSectionId === "ALL") {
                filteredProducts = products;
            } else {
                filteredProducts = products.filter((product) => {
                    const category = categories.find((cat) => cat._id === product.category._id);
                    return category && category.section && category.section._id === selectedSectionId;
                });
            }
        } else {
            filteredProducts = products.filter((product) => product.category._id === selectedCategoryId);
        }

        // Si hay un searchFilter, filtrar también por los nombres en varios idiomas
        if (searchFilter) {
            filteredProducts = filteredProducts.filter((product) => {
                const { name_es, name_en, name_pt } = product;
                const searchText = searchFilter.toLowerCase();

                return [name_es, name_en, name_pt].some((name) =>
                    name.toLowerCase().includes(searchText)
                );
            });
        }

        return filteredProducts;
    }, [products, categories, selectedCategoryId, selectedSectionId, searchFilter]);
};

export default useFilteredProducts;
