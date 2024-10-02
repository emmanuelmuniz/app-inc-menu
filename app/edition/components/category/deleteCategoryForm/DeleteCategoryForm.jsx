import { DeleteCategoryService } from '@/app/edition/services/category/deleteCategoryService/DeleteCategoryService'

export default function DeleteCategoryForm({ category, products, onCategoryDeleted }) {
    const handleDeleteCategory = async () => {
        if (hasAssociatedProducts()) {
            alert("La categoría tiene productos asociados. Elimine los productos " +
                "o cambie la categoría de los productos asociados para eliminar esta categoría");
        } else {
            try {
                const result = confirm("¿Estás seguro que desea eliminar esta categoía?");
                if (result) {
                    const id = category._id;
                    const response = await DeleteCategoryService({ id });
                    alert("Categoría eliminada correctamente.");
                    onCategoryDeleted();
                }
            } catch (error) {
                console.error("Error deleting category:", error);
                alert('Error al eliminar la categoría.');
            }
        }
    };

    const hasAssociatedProducts = () => {
        console.log(products)
        return products.some(product => product.category._id === category._id);
    };


    return (
        <button onClick={handleDeleteCategory}
            className="px-2 py-1 rounded-sm cursor-pointer bg-inc-light-blue transition hover:bg-inc-light-blue-hover text-white text-sm font-semibold">
            Eliminar
        </button>
    );
}