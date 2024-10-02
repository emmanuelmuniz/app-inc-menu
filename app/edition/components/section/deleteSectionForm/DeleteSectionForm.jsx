import { DeleteProductService } from '@/app/edition/services/product/deleteProductService/DeleteProductService'

export default function DeletProductForm({ categories, section, onSectionDeleted }) {

    const handleDeleteProduct = async () => {
        try {
            const result = confirm("¿Estás seguro que desea eliminar esta categoría?");
            if (result) {
                const id = product._id;
                const response = await DeleteProductService({ id });
                alert("Categoría eliminado correctamente.");
                onProductDeleted();
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            alert('Error al eliminar el producto.');
        }
    };

    const hasAssociatedCategories = () => {

    }

    return (
        <button onClick={handleDeleteProduct}
            className="px-2 py-1 rounded-sm cursor-pointer bg-inc-light-blue transition hover:bg-inc-light-blue-hover text-white text-sm font-semibold">
            Eliminar
        </button>
    );
}