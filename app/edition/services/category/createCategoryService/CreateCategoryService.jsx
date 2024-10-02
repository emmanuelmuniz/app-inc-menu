export async function CreateCategoryService({ category }) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/categories`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(category)
        });

        if (res.ok) {
            const data = await res.json();
            console.log('Category created successfully:', data);
            return data;
        } else {
            const errorData = await res.json();
            console.error(`Error ${res.status}:`, errorData.message || 'Unknown error');
            throw new Error(`Failed to create a new category. Status: ${res.status}`);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}