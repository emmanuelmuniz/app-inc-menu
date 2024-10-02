export async function UpdateCategoryService({ category, id }) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/categories/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(category)
        });

        if (res.ok) {
            const data = await res.json();
            console.log('Category updated successfully:', data);
            return data;
        } else {
            const errorData = await res.json();
            console.error(`Error ${res.status}:`, errorData.message || 'Unknown error');
            throw new Error(`Failed to update the category. Status: ${res.status}`);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}
