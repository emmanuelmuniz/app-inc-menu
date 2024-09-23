export async function DeleteProductService({ id }) {
    try {
        console.log("el id es " + id);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/products?id=${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            const errorData = await res.json();
            console.error(`Error ${res.status}:`, errorData.message || 'Unknown error');
            throw new Error(`Failed to delete product. Status: ${res.status}`);
        }
    } catch (error) {
        console.error('An error occurred while deleting the product:', error);
        throw error;
    }
}