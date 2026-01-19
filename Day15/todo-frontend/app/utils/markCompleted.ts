// utils/markAsCompleted.ts
import axios from "axios";

export const markAsCompleted = async (id: string) => {
    try {
        const res = await axios.patch(
            `http://localhost:3001/task/${id}`,
            { completed: true },
            { withCredentials: true }
        );
        console.log("Task marked as completed:", res.data);
        console.log("Response:", {
            status: res.status,
            data: res.data,
        });
        return res.data;
    } catch (error) {
        console.error("Error marking task completed", error);
        throw error;
    }
};