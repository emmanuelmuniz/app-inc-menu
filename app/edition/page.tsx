"use client"

import Editor from "@/app/edition/components/editor/Editor";
import { useSession } from "next-auth/react";

export default function Edition() {
    const { data: session, status } = useSession();

    return (
        <div className="h-full bg-white">
            <Editor />
        </div>
    );
}
