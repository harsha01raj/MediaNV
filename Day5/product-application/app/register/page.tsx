'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const url = "http://localhost:3005/user/register";
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError("");
        console.log({ username, email, password });
        // 👉 call API here
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Registartion failed");
                return;
            }
            console.log('Success:', data);
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            router.push("/login");
        } catch (error) {
            console.error("Error:", error);
            setError("Something went wrong");
        }
    };

    return (
        <section className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8">

                <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                    Create Account
                </h1>

                <form className="space-y-5" onSubmit={handleSubmit}>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="example@email.com"
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
                            placeholder="Create password"
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
                    >
                        Register
                    </button>
                </form>

                {/* Login Link */}
                <p className="text-sm text-gray-500 text-center mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-red-500 hover:underline font-medium">
                        Login here
                    </Link>
                </p>

            </div>
        </section>
    );
}
