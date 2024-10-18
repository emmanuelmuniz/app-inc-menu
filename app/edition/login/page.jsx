"use client";

import "./styles.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import logoImage from '@/public/icons/Logo_INC-03.svg'

import LoadingDisplay from "@/app/edition/components/loading/LoadingDisplay";
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
            {!loged ? (
                <div className="mt-36 mx-auto bg-ghost-white w-full md:w-[350px] pb-3">
                    <div className="w-full bg-gray-2 p-5 flex justify-center">
                        <img src={logoImage.src} alt="Icono de Instagram" className="h-14 mr-2 ml-1 mt-1 text-sm" />
                    </div>
                    <div className="p-6">
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
                                className={`text-white mt-2 w-full text-sm font-semibold p-4 py-3 rounded-sm ${loading ? 'bg-inc-light-blue opacity-50 cursor-not-allowed' : 'bg-inc-light-blue hover:bg-inc-light-blue-hover'
                                    } transition`}
                            >
                                Iniciar sesión
                            </button>
                        </form>
                    </div>
                    {loading &&
                        <div className="items-center w-full flex flex-col justify-center ">
                            <div className="flex">
                                <div className="mx-2">Cargando</div>
                                <MoonLoader size={20} />
                            </div>
                        </div>
                    }
                </div>
            ) : (
                <div className="">
                    <LoadingDisplay />
                </div>
            )
            }
        </>
    )
}