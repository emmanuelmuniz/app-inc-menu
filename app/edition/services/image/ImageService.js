import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/libs/firebase";

export const uploadImage = async (file, entityType) => {
    if (!file) throw new Error("No image file provided");
    if (!["product", "section", "category"].includes(entityType)) {
        throw new Error("Invalid entity type provided. Must be 'product', 'section', or 'category'.");
    }

    try {
        const storageRef = ref(storage, `${entityType}s/${file.name}`);
        await uploadBytes(storageRef, file);

        // Obtener la URL de la imagen cargada
        const imageUrl = await getDownloadURL(storageRef);
        return { imageUrl, storageRef };
    } catch (error) {
        throw new Error("Failed to upload image: " + error.message);
    }
};

export const deleteImage = async (storageRef) => {
    try {
        await deleteObject(storageRef);
    } catch (error) {
        console.error("Failed to delete image:", error);
    }
};
