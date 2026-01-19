/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";

export type Todo = {
    id: number;
    title: string;
    completed: boolean;
};

/**
 * Fetch tasks from backend
 * @param isCompleted - optional: true = completed, false = pending, undefined = all
 * @returns list of tasks
 */
export const fetchTasks = async (isCompleted?: boolean): Promise<Todo[]> => {
    try {
        const params: Record<string, any> = {};

        // only include completed filter if defined
        if (isCompleted !== undefined) {
            params.completed = isCompleted;
        }

        const res = await axios.get("http://localhost:3001/task", {
            params,
            withCredentials: true, // send cookies for auth
        });

        return res.data || [];
    } catch (err: any) {
        console.error("Error fetching tasks:", err);
        throw new Error(err.response?.data?.message || "Failed to fetch tasks");
    }
};