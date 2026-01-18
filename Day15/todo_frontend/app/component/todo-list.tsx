/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  ListTodo,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "1",
      text: "Design the new landing page",
      completed: true,
      createdAt: new Date(),
    },
    {
      id: "2",
      text: "Review pull requests",
      completed: false,
      createdAt: new Date(),
    },
    {
      id: "3",
      text: "Update documentation",
      completed: false,
      createdAt: new Date(),
    },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: newTodo.trim(),
          completed: false,
          createdAt: new Date(),
        },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      {/* Stats Banner */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-4 text-center transition-colors hover:border-accent/50">
          <p className="text-3xl font-bold text-foreground">{totalCount}</p>
          <p className="text-sm text-muted-foreground">Total Tasks</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center transition-colors hover:border-accent/50">
          <p className="text-3xl font-bold text-accent">{completedCount}</p>
          <p className="text-sm text-muted-foreground">Completed</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center transition-colors hover:border-accent/50">
          <p className="text-3xl font-bold text-foreground">
            {totalCount - completedCount}
          </p>
          <p className="text-sm text-muted-foreground">Remaining</p>
        </div>
      </div>

      {/* Add Todo Form */}
      <div className="relative">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              className="h-14 rounded-xl border-border bg-card pl-5 pr-4 text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-accent"
            />
          </div>
          <Button
            onClick={addTodo}
            className="h-14 rounded-xl bg-accent px-6 text-accent-foreground hover:bg-accent/90"
          >
            <Plus className="mr-2 h-5 w-5" />
            <span className="hidden sm:inline">Add Task</span>
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-1 rounded-xl border border-border bg-card p-1.5">
        {(["all", "active", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
              filter === f
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Todo Items */}
      <div className="space-y-3">
        {filteredTodos.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 py-16">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              {filter === "completed" ? (
                <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
              ) : filter === "active" ? (
                <Circle className="h-8 w-8 text-muted-foreground" />
              ) : (
                <ListTodo className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <p className="text-lg font-medium text-foreground">
              {filter === "completed"
                ? "No completed tasks yet"
                : filter === "active"
                  ? "All caught up!"
                  : "No tasks yet"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {filter === "all"
                ? "Add a task above to get started"
                : "Your filtered list is empty"}
            </p>
          </div>
        ) : (
          filteredTodos.map((todo, index) => (
            <div
              key={todo.id}
              className={cn(
                "group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-accent/50",
                todo.completed && "opacity-60"
              )}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className="flex-shrink-0"
                aria-label={
                  todo.completed ? "Mark as incomplete" : "Mark as complete"
                }
              >
                {todo.completed ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent">
                    <CheckCircle2 className="h-4 w-4 text-accent-foreground" />
                  </div>
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-muted-foreground/50 transition-colors hover:border-accent">
                    <Circle className="h-4 w-4 text-transparent" />
                  </div>
                )}
              </button>

              <span
                className={cn(
                  "flex-1 text-base transition-all",
                  todo.completed
                    ? "text-muted-foreground line-through"
                    : "text-foreground"
                )}
              >
                {todo.text}
              </span>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteTodo(todo.id)}
                className="h-9 w-9 opacity-0 transition-opacity group-hover:opacity-100 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                aria-label="Delete task"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>

      {/* Progress Bar */}
      {totalCount > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">
              {Math.round((completedCount / totalCount) * 100)}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{
                width: `${(completedCount / totalCount) * 100}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
