/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from "../context/Authcontext";
import toast from 'react-hot-toast';

export default function AuthPage() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [error, setError] = useState("");
    const [touched, setTouched] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Frontend-only validation
        if (!isLoggedIn && password !== passwordConfirm) {
            setError("Passwords do not match");
            return;
        }

        try {
            const payload: any = { email, password };

            if (!isLoggedIn) {
                payload.name = name;
            }

            const response = await axios.post(
                `http://localhost:3001/user/${isLoggedIn ? "login" : "register"}`,
                payload, {
                withCredentials: true,// if you forget this this , cookies will not be set 
            }
            );
            console.log("Response:", response.data);
            toast.success(response.data.message);
            setIsLoggedIn(true);
            router.refresh();
            router.push('/');
        } catch (error) {
            console.error("Error during authentication:", error);
        }
    };

    const handleConfirmPasswordChange = (value: string) => {
        setPasswordConfirm(value);
        setTouched(true);

        if (password !== value) {
            setError("Passwords do not match");
        } else {
            setError("");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white animate-fade-in">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {isLoggedIn ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="text-gray-500 mt-2">
                        {isLoggedIn
                            ? "Login to manage your tasks"
                            : "Start organizing your work"}
                    </p>
                </div>


                <form className="space-y-5" onSubmit={handleSubmit}>
                    {!isLoggedIn && (
                        <div>
                            <label className="text-sm text-gray-600">Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    )}

                    <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {!isLoggedIn && (
                        <div>
                            <label className="text-sm text-gray-600">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className={`mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none
                  ${error
                                        ? "border-red-500 focus:ring-red-500"
                                        : "focus:ring-indigo-500"
                                    }
                `}
                                value={passwordConfirm}
                                onChange={(e) =>
                                    handleConfirmPasswordChange(e.target.value)
                                }
                            />
                            {touched && error && (
                                <p className="text-sm text-red-500 mt-1">{error}</p>
                            )}
                        </div>
                    )}


                    <button
                        type="submit"
                        className="w-full rounded-lg bg-indigo-600 py-2.5 text-white font-medium hover:bg-indigo-700 transition-all"
                    >
                        {isLoggedIn ? "Login" : "Register"}
                    </button>
                </form>


                <div className="text-center mt-6 text-sm text-gray-500">
                    {isLoggedIn ? (
                        <>
                            Don’t have an account?{" "}
                            <button
                                type="button"
                                onClick={() => {
                                    setIsLoggedIn(false);
                                    setError("");
                                    setTouched(false);
                                }}
                                className="text-indigo-600 hover:underline"
                            >
                                Register
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => {
                                    setIsLoggedIn(true);
                                    setError("");
                                    setTouched(false);
                                }}
                                className="text-indigo-600 hover:underline"
                            >
                                Login
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}