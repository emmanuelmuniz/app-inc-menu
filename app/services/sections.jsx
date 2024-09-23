const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function GetSections() {
    try {
        const res = await fetch(`${apiUrl}api/sections`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error("Failed to fetch sections.");
        }

        return res.json();
    } catch (error) {
        console.log("Error loading sections: ", error);
    }
}