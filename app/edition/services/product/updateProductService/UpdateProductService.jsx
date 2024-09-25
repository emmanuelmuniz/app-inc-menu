export async function UpdateProductService({ product, id }) {
    console.log(product);
    try {
        console.log(id);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(product)
        });

        if (res.ok) {
            const data = await res.json();
            console.log('Product updated successfully:', data);
            return data;
        } else {
            const errorData = await res.json();
            console.error(`Error ${res.status}:`, errorData.message || 'Unknown error');
            throw new Error(`Failed to update the product. Status: ${res.status}`);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}
