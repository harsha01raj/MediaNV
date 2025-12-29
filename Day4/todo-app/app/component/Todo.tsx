"use client";

import { Edit2Icon, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { useState, FormEvent, useEffect } from "react";

type TodoItem = {
    id?: string;
    _id?: string;
    title: string;
    details: string;
};

export default function Todo() {
    const router=useRouter();
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const URL = "http://localhost:8080/todos";



    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await fetch(URL);
                const data = await res.json();
                console.log(data);
                setTodos(data);
            } catch (error) {
                console.log("Error fetching todos:", error);
            }
        }
        fetchTodos();
    }, []);

    const deleteData = (id?: string) => async () => {
        try {
            const res = await fetch(`${URL}/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setTodos((prev) => prev.filter((todo) => todo._id !== id));
            } else {
                console.log("Failed to delete todo");
            }
        } catch (error) {
            console.log("Error deleting todo:", error);
        }
    };

   const addTask = async (e: FormEvent) => {
        e.preventDefault();
        const newTask: TodoItem = { title, details };

        try {
            const res = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTask),
            });
            if (res.ok) {
                const createdTask = await res.json();
                setTodos((prev) => [...prev, createdTask]);
                setTitle("");
                setDetails("");
            } else {
                console.log("Failed to add task");
            }
        } catch (error) {
            console.log("Error adding task:", error);
        }
    };

    return (
        <section className="h-screen overflow-y-auto border-black border-2">
            <h2 className="text-center text-2xl font-bold mt-3">Your Todo List</h2>
            <section className="flex items-center justify-center gap-4 min-h-[90vh]">
                <section className="w-3/4 border-black border-2 h-[90vh] m-5 p-5">
                    <h1 className="text-center text-2xl font-bold">Create Todo</h1>
                    <form onSubmit={addTask} className="border-2 flex items-center justify-around mt-5 p-5">
                        <input
                            type="text"
                            placeholder="Enter your task"
                            className="border-2 m-2 p-2 w-2/5"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter your task details"
                            className="border-2 m-2 p-2 w-2/5"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                        />
                        <button type="submit" className="border-2 m-2 p-2 bg-blue-500 text-white rounded">Add Task</button>
                    </form>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-2">Tasks</h2>
                        <ul className="space-y-2">
                            {todos.map((t) => (
                                <li key={t._id} className="border p-3 rounded flex items-center gap-3">
                                    <div className="font-bold w-1/3 overflow-x-scroll">{t._id}</div>
                                    <div className="font-bold w-1/3 overflow-x-scroll">{t.title}</div>
                                    <div className="text-sm text-gray-600 w-1/3 overflow-x-scroll">{t.details}</div>
                                    <div><Trash2 className="cursor-pointer" onClick={()=>deleteData(t._id)}/></div>
                                    <div><Edit2Icon className="cursor-pointer" onClick={()=>router.push(`/edit-task/${t._id}`)}/></div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </section>
        </section>
    );
}