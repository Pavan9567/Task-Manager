"use client";
import { useEffect, useState } from "react";
import { getTaskById } from "@/app/actions";
import { useParams } from "next/navigation";

export default function TaskDetail() {
    const { id } = useParams();
    const taskId = String(id);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [task, setTask] = useState<any>(null);

    useEffect(() => {
        async function fetchTask() {
            if (!taskId) return;
            const data = await getTaskById(taskId);
            setTask(data);
        }

        fetchTask();
    }, [taskId]);

    if (!task) {
        return <p>Loading task...</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-gray-900"><span className="text-2xl font-bold">Title: </span>{JSON.stringify(task.title)}</h1>
            <p className="text-gray-700"><span className="text-2xl font-bold">Description: </span>{JSON.stringify(task.description)}</p>
            <p className="text-gray-500"><span className="text-2xl font-bold">Due Date: </span>{JSON.stringify(task.dueDate)}</p>
        </div>
    );
}
