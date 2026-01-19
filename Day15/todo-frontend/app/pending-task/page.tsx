"use client";

import { useEffect, useState } from "react";
import PendingTasks from "../component/pending_tasks";
import ProtectedRoute from "../component/protected_routes";
import { fetchTasks, Todo } from "../utils/fetchTasks";
export default function CompletedTaskPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    
      useEffect(() => {
        const fetchAllTasks = async () => {
          try {
            const allTasks = await fetchTasks(true); // fetch only completed
            console.log("Fetched completed tasks:", allTasks);
            setTodos(allTasks);
          } catch (err) {
            console.error("Failed to fetch tasks", err);
          }
        };
        fetchAllTasks();
      }, []);

    return (
        <ProtectedRoute>
            <PendingTasks todos={todos} />
        </ProtectedRoute>
    )

}