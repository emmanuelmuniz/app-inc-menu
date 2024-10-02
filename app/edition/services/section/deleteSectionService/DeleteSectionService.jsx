export async function DeleteSectionService({ id }) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/sections?id=${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            const errorData = await res.json();
            console.error(`Error ${res.status}:`, errorData.message || 'Unknown error');
            throw new Error(`Failed to delete section. Status: ${res.status}`);
        }
    } catch (error) {
        console.error('An error occurred while deleting the section:', error);
        throw error;
    }
}