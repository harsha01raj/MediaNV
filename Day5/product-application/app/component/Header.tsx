"use client";

import { SearchIcon, ShoppingCart, User, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    // Load token safely (client-side only)
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        router.push("/login");
    };

    return (
        <header className="p-3 flex items-center justify-between fixed top-0 left-0 w-full z-50 bg-white shadow-md">
            {/* Logo */}
            <div className="flex items-center gap-4">
                <div className="relative w-12 h-12">
                    <Image
                        src="/Burger.png"
                        alt="Burger King"
                        fill
                        className="object-contain"
                    />
                </div>
                <p className="font-extrabold text-2xl tracking-wide">Burger King</p>
            </div>

            {/* Search */}
            <div className="hidden md:flex w-[400px] border border-gray-300 px-3 py-2 rounded-full items-center gap-2">
                <input
                    type="text"
                    placeholder="Search your burger..."
                    className="flex-1 outline-none text-sm"
                />
                <SearchIcon size={18} className="text-gray-500" />
            </div>

            {/* Nav */}
            <nav className="hidden lg:flex gap-8 font-medium">
                <Link href="/" className="hover:text-red-600">Home</Link>
                <Link href="#" className="hover:text-red-600">Custom Burger</Link>
                <Link href="#" className="hover:text-red-600">King Deals</Link>
                <Link href="/admin" className="hover:text-red-600">Admin</Link>
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-6">
                <Link href="/cart">
                    <ShoppingCart className="hover:text-red-600 cursor-pointer" />
                </Link>

                {/* 🔥 CONDITIONAL AUTH UI */}
                {token ? (
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                            <User size={18} />
                            <span className="text-sm font-semibold">Ajit</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-red-600 hover:text-red-800"
                            title="Logout"
                        >
                            <LogOut />
                        </button>
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="font-semibold hover:text-red-600"
                    >
                        Login / Register
                    </Link>
                )}
            </div>
        </header>
    );
}