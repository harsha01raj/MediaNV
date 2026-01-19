'use client';
import { CreateTodo } from "./component/create_todo";
import ProtectedRoute from "./component/protected_routes";


export default function Home() {
  return (
    <ProtectedRoute>
      <div>
        <CreateTodo />
      </div>
    </ProtectedRoute>
  );
}
