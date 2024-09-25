export async function UpdateProductsService(products) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/products`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(products),
        });

        if (res.ok) {
            const data = await res.json();
            console.log('Products updated successfully:', data);
            return data;
        } else {
            const errorData = await res.json();
            console.error(`Error ${res.status}:`, errorData.message || 'Unknown error');
            throw new Error(`Failed to update products. Status: ${res.status}`);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        throw error; // Lanzar el error para que se maneje en el lugar donde se llame al servicio
    }
}