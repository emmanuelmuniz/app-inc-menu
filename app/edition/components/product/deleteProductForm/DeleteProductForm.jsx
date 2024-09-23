import "./styles.css";

import { DeleteProductService } from '@/app/edition/services/product/deleteProductService/DeleteProductService'


export default function DeletProductForm({ product, products, onProductDeleted }) {
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
        <button onClick={handleDeleteProduct}>
            Eliminar
        </button>
    );
}