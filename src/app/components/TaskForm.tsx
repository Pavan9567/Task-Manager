"use client";
import { useState } from "react";
import { addTask } from "../actions";

export default function TaskForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addTask(title, description, new Date().toISOString());
        setTitle("");
        setDescription("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" className="border p-2" />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border p-2" />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Task</button>
        </form>
    );
}