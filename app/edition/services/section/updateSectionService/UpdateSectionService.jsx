export async function UpdateSectionService({ section, id }) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/sections/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(section)
        });

        if (res.ok) {
            const data = await res.json();
            console.log('Section updated successfully:', data);
            return data;
        } else {
            const errorData = await res.json();
            console.error(`Error ${res.status}:`, errorData.message || 'Unknown error');
            throw new Error(`Failed to update the section. Status: ${res.status}`);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}
