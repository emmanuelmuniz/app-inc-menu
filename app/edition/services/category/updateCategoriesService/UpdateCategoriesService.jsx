export async function UpdateCategoriesService(categories) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/categories`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(categories),
        });

        if (res.ok) {
            const data = await res.json();
            console.log('Categories updated successfully:', data);
            return data;
        } else {
            const errorData = await res.json();
            console.error(`Error ${res.status}:`, errorData.message || 'Unknown error');
            throw new Error(`Failed to update categories. Status: ${res.status}`);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}