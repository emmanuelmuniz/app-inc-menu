import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/libs/firebase";

// Servicio para subir una imagen
export const uploadImage = async (image, type) => {
    try {
        const filePath = `${type}s/${Date.now()}_${image.name}`;
        const fileRef = ref(storage, filePath);

        await uploadBytes(fileRef, image);
        const downloadURL = await getDownloadURL(fileRef);

        return {
            imageUrl: downloadURL,
            storageRef: fileRef.fullPath,
        };
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};

export const deleteImage = async (storagePath) => {
    try {
        const fileRef = ref(storage, storagePath);
        await deleteObject(fileRef);

        return {
            success: true,
            message: "Image deleted successfully",
        };
    } catch (error) {
        console.error("Failed to delete image:", error);
        return {
            success: false,
            message: error.message || "Failed to delete image",
        };
    }
};
