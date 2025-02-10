import mongoose, { Schema, model, Document } from "mongoose";

interface ITask extends Document {
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
}

const TaskSchema = new Schema<ITask>({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    completed: { type: Boolean, default: false },
});

const Task = model<ITask>("Task", TaskSchema)
export default Task;