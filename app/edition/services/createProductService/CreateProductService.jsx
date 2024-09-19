export async function CreateProductService({ product }) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/products`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(product) // Nota: ya no es necesario envolver product en otro objeto
        });

        // Verifica si la respuesta es OK (status 200-299)
        if (res.ok) {
            // Obtener la respuesta JSON
            const data = await res.json();
            console.log('Product created successfully:', data);
            return data; // Devuelve la respuesta si necesitas usarla
        } else {
            // Maneja errores basados en el código de estado
            const errorData = await res.json();
            console.error(`Error ${res.status}:`, errorData.message || 'Unknown error');
            throw new Error(`Failed to create a new product. Status: ${res.status}`);
        }
    } catch (error) {
        // Maneja excepciones de la solicitud fetch
        console.error('An error occurred:', error);
    }
}