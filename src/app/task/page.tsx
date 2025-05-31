"use client";
 
import { useState } from "react";
import { api } from "~/trpc/react";
 
export default function HomePage() {
  const [title, setTitle] = useState("");
  // tRPC hooks
  const utils = api.useUtils();
  const { data: tasks, isLoading } = api.task.getAll.useQuery();
  const addTask = api.task.add.useMutation({
    onSuccess: () => {
      setTitle("");
      utils.task.getAll.invalidate(); // refresh
    },
  });
  const toggleTask = api.task.toggle.useMutation({
    onSuccess: () => utils.task.getAll.invalidate(),
  });
 
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length === 0) return;
    addTask.mutate({ title });
  };
 
  return (
    <main className="mx-auto mt-10 max-w-md p-4">
      <h1 className="mb-4 text-2xl font-bold">📝 Task Tracker</h1>
 
      <form onSubmit={handleAdd} className="mb-6 flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task"
          className="w-full rounded border px-3 py-2"
        />
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Add
        </button>
      </form>
 
      {/* {isLoading ? (
        <p>Loading...</p>
      ) : ( */}
      <ul className="space-y-2">
        {tasks?.map((task) => (
          <li
            key={task.id}
            onClick={() => toggleTask.mutate(task.id)}
            className={`cursor-pointer rounded border p-3 ${
              task.completed ? "bg-green-100 line-through" : "bg-white"
            }`}
          >
            {task.title}
          </li>
        ))}
      </ul>
      {/* )} */}
    </main>
  );
}