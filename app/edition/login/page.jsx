"use client";

import "./styles.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


import { useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loged, setLoged] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await signIn("credentials", {
                email, password, redirect: false,
            });

            if (!res.ok) {
                alert("Credenciales incorrectas");
                setLoading(false);
            } else {
                setLoading(false);
                router.push("/edition");
                setLoged(true);
            }

            if (res.error) {
                setError("Credenciales incorrectas");
                alert("Credenciales incorrectas")
                return;
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {!loged &&
                <div className="mt-36 mx-auto bg-ghost-white w-full md:w-80 p-8">
                    <div className="">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="my-2">
                                <input className="text-sm appearance-none block w-full border border-gray-3 rounded-sm py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Usuario"
                                    required
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
                    {loading &&
                        <div className="items-center w-full flex flex-col justify-center mt-2">
                            <div className="flex">
                                <div className="mr-2">Cargando</div>
                                <MoonLoader size={20} />
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    )
}