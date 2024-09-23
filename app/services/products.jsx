const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function GetProducts() {
    try {
        const res = await fetch(`${apiUrl}api/products`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            throw new Error("Failed to fetch products.");
        }

        return res.json();
    } catch (error) {
        console.log("Error loading products: ", error);
    }
}