"use client";
import { useEffect, useState } from "react";
import { fetchTasks } from "../utils/fetchTasks";
import { markAsCompleted } from "../utils/markCompleted";

type Todo = {
  id: string;
  task: string;
  completed: boolean;
};

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const allTasks = await fetchTasks();
        setTodos(allTasks);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };
    fetchAllTasks();
  }, []);

  const handleTodoClick = async (id: string, completed: boolean) => {
    if (completed) return;

    try {
      await markAsCompleted(id);

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: true } : todo
        )
      );
      
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  return (
    <div className="border-2 w-[50vw] m-auto mt-10 rounded-lg">
      <h2 className="text-xl font-semibold p-4 border-b text-center">
        Todo List
      </h2>

      <div className="max-h-[50vh] overflow-y-auto px-4 py-4">
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              onClick={() => handleTodoClick(todo.id, todo.completed)}
              className={`flex items-center gap-3 p-3 rounded border cursor-pointer
                ${todo.completed ? "opacity-60 cursor-not-allowed" : ""}
              `}
            >
              <div
                className={`h-5 w-5 rounded border flex items-center justify-center
                  ${todo.completed ? "bg-green-500 border-green-500" : ""}
                `}
              >
                {todo.completed && <span className="text-white">✓</span>}
              </div>

              <span
                className={`text-lg ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {todo.task}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}