import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBQu1pa8pizBcuF325zHerSKao4e9LCLb0",
    authDomain: "inc-menu.firebaseapp.com",
    projectId: "inc-menu",
    storageBucket: "inc-menu.appspot.com",
    messagingSenderId: "715189458642",
    appId: "1:715189458642:web:e62762da749775e50fbf0b",
    measurementId: "G-JBKVXLWP6V"
};

// Inicializa la app de Firebase
const app = initializeApp(firebaseConfig);

// Exporta el almacenamiento
const storage = getStorage(app);

export { storage };