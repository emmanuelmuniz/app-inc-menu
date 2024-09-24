import "./styles.css";

import { DeleteProductService } from '@/app/edition/services/product/deleteProductService/DeleteProductService'


export default function DeletProductForm({ product, onProductDeleted }) {
    const handleDeleteProduct = async () => {
        try {
            const result = confirm("¿Estás seguro que desea eliminar este producto?");
            if (result) {
                const id = product._id;
                const response = await DeleteProductService({ id });
                alert("Producto eliminado correctamente.");
                onProductDeleted();
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            alert('Error al eliminar el producto.');
        }
    };

    return (
        <button onClick={handleDeleteProduct}
            className="px-2 py-1 rounded-sm cursor-pointer bg-inc-light-blue transition hover:bg-inc-light-blue-hover text-white text-sm font-semibold">
            Eliminar
        </button>
    );
}