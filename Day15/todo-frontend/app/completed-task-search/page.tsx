"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProtectedRoute from "../component/protected_routes";

type Todo = {
    id: number;
    title: string;
    completed: boolean;
};

export default function CompletedTaskSearchPage() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("query") || "";

    // Sample tasks
    const [todos] = useState<Todo[]>([
        { id: 1, title: "Learn NestJS", completed: true },
        { id: 2, title: "Build Todo App", completed: false },
        { id: 3, title: "Revise Tailwind", completed: true },
        { id: 4, title: "Read Documentation", completed: false },
        { id: 5, title: "Write Tests", completed: true },
    ]);

    const [search, setSearch] = useState(initialQuery);
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

    // Debounce search
    useEffect(() => {
        const handler = setTimeout(() => {
            const query = search.toLowerCase().trim();
            setFilteredTodos(
                todos.filter(
                    (todo) =>
                        todo.completed &&
                        todo.title.toLowerCase().includes(query)
                )
            );
        }, 300);

        return () => clearTimeout(handler);
    }, [search, todos]);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6 animate-fade-in">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl border p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Search Completed Tasks
                    </h1>

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Type to search completed tasks..."
                        className="w-full border rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    />

                    {filteredTodos.length === 0 ? (
                        <p className="text-center text-gray-400 italic">
                            No matching completed tasks found.
                        </p>
                    ) : (
                        <ul className="space-y-4 max-h-[60vh] overflow-y-auto">
                            {filteredTodos.map((todo) => (
                                <li
                                    key={todo.id}
                                    className="flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 hover:shadow-sm opacity-60 line-through"
                                >
                                    <span className="text-gray-700">{todo.title}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}