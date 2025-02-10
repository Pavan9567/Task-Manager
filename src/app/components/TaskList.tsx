"use client";
import { useEffect, useState } from "react";
import { getTasks, updateTask, deleteTask } from "../actions";
import Link from "next/link";

interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchData();
  }, []);

  const toggleComplete = async (id: string, completed: boolean) => {
    try {
      await updateTask(id, !completed);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? { ...task, completed: !completed } : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <ul className="p-4">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <li key={task._id} className="border p-2 flex justify-between">
            <span className={task.completed ? "line-through" : ""}>{task.title}</span>
            <div>
              <Link href={`/task/${task._id}`}>
                <button className="bg-blue-500 text-white p-1">View</button>
              </Link>
              <button onClick={() => toggleComplete(task._id, task.completed)} className="bg-green-500 text-white p-1 mx-1">{task.completed ? "Undo" : "Complete"}</button>
              <button onClick={() => deleteTask(task._id)} className="bg-red-500 text-white p-1">Delete</button>
            </div>
          </li>
        ))
      ) : (
        <p className="text-center">No tasks available.</p>
      )}
    </ul>
  );
}
