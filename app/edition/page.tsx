"use client"

import Editor from "@/app/edition/components/editor/Editor";
import { useSession } from "next-auth/react";

export default function Edition() {
    const { data: session, status } = useSession();

    // Mientras se carga la sesión, puedes mostrar un indicador de carga opcionalmente
    if (status === "loading") {
        return <p>Cargando...</p>;
    }

    return (
        <div className="h-full bg-white">
            <Editor />
        </div>
    );
}
