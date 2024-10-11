import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/libs/firebase";

export const uploadImage = async (image, type) => {
    try {
        // Define el filePath con base en el tipo y un nombre único
        const filePath = `${type}s/${Date.now()}_${image.name}`;
        const fileRef = ref(storage, filePath);

        // Sube la imagen
        await uploadBytes(fileRef, image);

        // Obtén la URL de descarga
        const downloadURL = await getDownloadURL(fileRef);

        // Retorna la URL y el fullPath de la referencia del archivo
        return {
            imageUrl: downloadURL,
            storageRef: fileRef.fullPath // Esto guarda solo la ruta del archivo
        };
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error; // Lanza el error para que se maneje en el try-catch donde se llame la función
    }
};

export const deleteImage = async (storageRef) => {
    try {
        await deleteObject(storageRef);
    } catch (error) {
        console.error("Failed to delete image:", error);
    }
};
