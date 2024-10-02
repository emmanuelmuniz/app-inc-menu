export async function CreateSectionService({ section }) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/sections`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(section)
        });

        if (res.ok) {
            const data = await res.json();
            console.log('Section created successfully:', data);
            return data;
        } else {
            const errorData = await res.json();
            console.error(`Error ${res.status}:`, errorData.message || 'Unknown error');
            throw new Error(`Failed to create a new section. Status: ${res.status}`);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}