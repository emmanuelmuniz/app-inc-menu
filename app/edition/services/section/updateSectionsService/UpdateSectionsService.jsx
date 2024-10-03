export async function UpdateSectionsService(sections) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/sections`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(sections),
        });

        if (res.ok) {
            const data = await res.json();
            console.log('Sections updated successfully:', data);
            return data;
        } else {
            const errorData = await res.json();
            console.error(`Error ${res.status}:`, errorData.message || 'Unknown error');
            throw new Error(`Failed to update sections. Status: ${res.status}`);
        }
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
}