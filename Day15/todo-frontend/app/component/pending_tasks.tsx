"use client";

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

export default function PendingTasks({ todos }: { todos: Todo[] }) {
  const pendingTodos = todos;

  const toggleTodo = () => {
    
  };

  return (
    <div className="border-2 w-[50vw] m-auto mt-10 rounded-lg animate-fade-in-down h-[80vh] overflow-y-auto">
      <h2 className="text-xl font-semibold p-4 border-b text-center sticky top-0 bg-white z-10 border-2">
        Pending Tasks
      </h2>

      <div className="max-h-[70vh] overflow-y-auto px-4 py-4">
        <ul className="space-y-4">
          {pendingTodos.map((todo) => (
            <li
              key={todo.id}
              onClick={() => toggleTodo(todo.id)}
              tabIndex={0}
              className={`
                flex items-center gap-3 p-3 rounded cursor-pointer
                border transition-all duration-300
                hover:bg-gray-50 focus:outline-none focus:ring-2
              `}
            >
              {/* Checkbox */}
              <div
                className={`
                  h-5 w-5 rounded border flex items-center justify-center
                  transition-all duration-300
                  ${
                    todo.completed
                      ? "bg-green-500 border-green-500"
                      : "border-gray-400"
                  }
                `}
              >
                {todo.completed && (
                  <span className="text-white text-sm animate-scale-in">
                    ✓
                  </span>
                )}
              </div>

              {/* Task Text */}
              <span
                className={`
                  text-lg transition-all duration-300
                  ${
                    todo.completed
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }
                `}
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