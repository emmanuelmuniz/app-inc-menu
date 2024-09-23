const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function GetCategories() {
    try {
        const res = await fetch(`${apiUrl}api/categories`, {
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