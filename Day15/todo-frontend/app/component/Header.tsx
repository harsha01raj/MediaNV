'use client';

import { AlarmClockCheck, Search } from "@deemlol/next-icons"; // Removed User icon, we'll create custom
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "../context/Authcontext";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Todo = {
    id: number;
    title: string;
    completed: boolean;
};

export function Header() {
    const router = useRouter();
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, title: "Learn NestJS", completed: false },
        { id: 2, title: "Build Todo App", completed: true },
        { id: 3, title: "Revise Tailwind", completed: false },
        { id: 4, title: "Read Documentation", completed: false },
        { id: 5, title: "Write Tests", completed: true },
        { id: 6, title: "Deploy Application", completed: false },
        { id: 7, title: "Fix Bugs", completed: false },
    ]);

    const [search, setSearch] = useState("");
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const { isLoggedIn, setIsLoggedIn, user } = useAuth();

    // Debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            const query = search.toLowerCase().trim();
            if (query.length > 0) {
                setFilteredTodos(
                    todos.filter((todo) =>
                        todo.title.toLowerCase().includes(query)
                    )
                );
                setShowDropdown(true);
            } else {
                setFilteredTodos([]);
                setShowDropdown(false);
            }
        }, 300);

        return () => clearTimeout(handler);
    }, [search, todos]);

    const handleComplete = (id: number) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: true } : todo
            )
        );
        setShowDropdown(false);
        setSearch("");
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3001/auth/logout",
                {},
                { withCredentials: true }
            );
            toast.success(response.data.message || "Logged out successfully");
            setIsLoggedIn(false);
            router.push("/auth");
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    // Get first letter of user name/email
    const userInitial = user?.name?.[0].toUpperCase() || user?.email?.[0].toUpperCase() || "";

    return (
        <nav className="h-20 flex items-center justify-between shadow-md sticky top-0 bg-white z-20 px-6">
            {/* Left side: Logo */}
            <div className="flex items-center gap-5">
                <AlarmClockCheck size={36} color="black" />
                <h1 className="font-extrabold text-xl">Todo Application</h1>
            </div>

            {/* Middle: Links */}
            <div className="flex items-center gap-6">
                <Link href="/">Create Task</Link>
                <Link href="/completed-task">Completed Tasks</Link>
                <Link href="/pending-task">Pending Task</Link>
            </div>

            {/* Right side: Search + Auth + User */}
            <div className="flex items-center gap-6">
                {/* Search */}
                <div className="relative">
                    <div className="border w-80 p-2 rounded-lg flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="w-full focus:outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onFocus={() => search && setShowDropdown(true)}
                            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                        />
                    </div>

                    {showDropdown && filteredTodos.length > 0 && (
                        <ul className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                            {filteredTodos.map((todo) => (
                                <li
                                    key={todo.id}
                                    className={`px-4 py-2 cursor-pointer hover:bg-green-50 ${todo.completed ? "line-through text-gray-500" : ""
                                        }`}
                                    onClick={() => handleComplete(todo.id)}
                                >
                                    {todo.title}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Auth/User */}
                {isLoggedIn ? (
                    <div className="flex items-center gap-3">
                        {/* Circle avatar with first letter */}
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                            {userInitial}
                        </div>
                        <span className="font-medium">{user?.name || user?.email}</span>
                        <button
                            onClick={handleLogout}
                            className="text-red-600 hover:underline ml-2"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link href="/auth">Login</Link>
                )}
            </div>
        </nav>
    );
}