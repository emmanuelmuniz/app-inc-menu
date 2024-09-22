export async function CreateProductService({ product }) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/products`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(product)
        });

        if (res.ok) {
            const data = await res.json();
            console.log('Product created successfully:', data);
            return data;
        } else {
            const errorData = await res.json();
            console.error(`Error ${res.status}:`, errorData.message || 'Unknown error');
            throw new Error(`Failed to create a new product. Status: ${res.status}`);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}