import { useState, useEffect } from "react";

import { GetSections } from "@/app/services/sections";
import { GetCategories } from "@/app/services/categories";
import { GetProducts } from "@/app/services/products";

const useLoadData = ({ setProducts }) => {
    const [sections, setSections] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSections = async () => {
            await GetSections().then((response) => {
                const allSections = [{ _id: "ALL", name_es: "TODAS" }, ...response.sections];
                setSections(allSections);

                const getCategories = async () => {
                    await GetCategories().then((response) => {
                        setCategories(response.categories);
                        setSelectedCategoryId("ALL");
                        loadProducts();
                    });
                };
                getCategories();
            });
        };
        getSections();
    }, []);

    const loadProducts = async () => {
        await GetProducts().then((response) => {
            setProducts(response.products);
            setLoading(false);
        });
    };

    const loadSections = async () => {
        await GetSections().then((response) => {
            setSections(response.sections);
        });
    };

    const loadCategories = async () => {
        await GetCategories().then((response) => {
            setCategories(response.categories);
        });
    };

    return { sections, categories, selectedCategoryId, setSelectedCategoryId, loadProducts, loadCategories, loadSections, loading };
};

export default useLoadData;
