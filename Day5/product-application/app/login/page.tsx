'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(" ");
    const url = "http://localhost:3005/user/login";
    const router = useRouter();
    async function handleSubmit(e) {
        e.preventDefault();
        console.log(email, password);
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Registartion failed");
                return;
            }
            console.log('Success:', data);
            localStorage.setItem("token",data.Token);
            setEmail("");
            setPassword("");
            router.push("/");
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <section className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8">

                <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                    Admin Login
                </h1>

                <form className="space-y-5" onSubmit={handleSubmit}>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="admin@example.com"
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
                    >
                        Login
                    </button>
                </form>

                {/* Register Link */}
                <p className="text-sm text-gray-500 text-center mt-6">
                    Don’t have an account?{" "}
                    <Link
                        href="/register"
                        className="text-red-500 hover:underline font-medium"
                    >
                        Register here
                    </Link>
                </p>

            </div>
        </section>
    );
}