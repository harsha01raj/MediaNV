"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function EditTask() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const URL = "http://localhost:8080/todos";

  const updateTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      console.error("ID not found");
      return;
    }

    try {
      const res = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, details }),
      });

      if (!res.ok) {
        throw new Error("Failed to update task");
      }

      router.push("/");
    } catch (error) {
      console.error("Issue with updating", error);
    }
  };

  return (
    <section className="h-screen overflow-y-auto border-black border-2">
            <h2 className="text-center text-2xl font-bold mt-3">Your Todo List</h2>
            <section className="flex items-center justify-center gap-4 min-h-[90vh]">
                <section className="w-3/4 border-black border-2 h-[90vh] m-5 p-5">
                    <h1 className="text-center text-2xl font-bold">Update Todo</h1>
                    <form onSubmit={updateTask} className="border-2 flex items-center justify-around mt-5 p-5">
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
                        <button type="submit" className="border-2 m-2 p-2 bg-blue-500 text-white rounded">Update Task</button>
                    </form>
                </section>
            </section>
        </section>
  );
}