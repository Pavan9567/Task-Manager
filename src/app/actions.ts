"use server";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";

export async function getTasks() {
    try {
        await connectDB();
        const tasks = await Task.find().lean();
        return tasks.map((task) => ({
            ...task, _id: task._id.toString(),
        }));
    }catch (error) {
        console.log("Error fetching tasks:", error);
        return [];
    }
}

export async function getTaskById(id: string) {
    try {
        await connectDB()
        console.log("Fetching task from DB with ID:", id);

        const task = await Task.findById(id).lean();

        if(!task) {
            throw new Error("Task not found");
        }

        return { ...task, _id: task._id.toString() };
    }catch (error) {
        console.log("Error fetching tasks:", error);
        return null;
    }
}

export async function addTask(
    title: string,
    description: string,
    dueDate: string
) {
    try {
        await connectDB();
        const newTask = await Task.create({ title, description, dueDate });

        return JSON.parse(JSON.stringify(newTask));
    }catch (error) {
        console.error("Error adding task:", error);
        return null;
    }
}

export async function updateTask(id: string, completed: boolean) {
    await connectDB();
    return await Task.findByIdAndUpdate(id, { completed });
}

export async function deleteTask(id: string) {
    await connectDB();
    return Task.findByIdAndDelete(id);
}