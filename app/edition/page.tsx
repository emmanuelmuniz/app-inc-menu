"use client"

import Editor from "@/app/edition/components/editor/Editor";
import Login from "@/app/edition/components/auth/login/Login";
import { useSession } from "next-auth/react";

export default function Edition() {
    const { data: session, status } = useSession();

    // Mientras se carga la sesión, puedes mostrar un indicador de carga opcionalmente
    if (status === "loading") {
        return <p>Cargando...</p>;
    }

    return (
        <div className="h-full bg-white">
            {session ? <Editor /> : <Login />}
        </div>
    );
}
