"use client";

import "./styles.css";

import { useState } from "react";

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <div className="mt-36 mx-auto bg-white h-60 w-full md:w-80 p-8">
                <div className="">
                    <form action="">
                        <div className="my-2">
                            <input className="text-sm appearance-none block w-full border border-gray-3 rounded-sm py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                type="text"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                placeholder="Usuario"
                                requireds
                            />
                        </div>
                        <div className="my-2">
                            <input className="text-sm appearance-none block w-full border border-gray-3 rounded-sm py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`text-white my-2 w-full text-sm font-semibold p-4 py-3 rounded-sm ${loading ? 'bg-inc-light-blue opacity-50 cursor-not-allowed' : 'bg-inc-light-blue hover:bg-inc-light-blue-hover'
                                } transition`}
                        >
                            Iniciar sesión
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}