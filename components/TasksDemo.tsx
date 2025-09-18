"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function TasksDemo() {
  const tasks = useQuery(api.tasks.get);
  const createTask = useMutation(api.tasks.create);
  const toggleTask = useMutation(api.tasks.toggle);
  const removeTask = useMutation(api.tasks.remove);
  
  const [newTaskText, setNewTaskText] = useState("");

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      await createTask({ text: newTaskText.trim() });
      setNewTaskText("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-card rounded-lg border">
      <h2 className="text-2xl font-bold mb-4">Convex Tasks Demo</h2>
      
      {/* Add new task form */}
      <form onSubmit={handleCreateTask} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-1 px-3 py-2 border border-input rounded-md bg-background"
          />
          <Button type="submit" disabled={!newTaskText.trim()}>
            Add
          </Button>
        </div>
      </form>

      {/* Tasks list */}
      <div className="space-y-2">
        {tasks === undefined ? (
          <p className="text-muted-foreground">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-muted-foreground">No tasks yet. Add one above!</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="flex items-center gap-2 p-2 border rounded">
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => toggleTask({ id: task._id })}
                className="rounded"
              />
              <span 
                className={`flex-1 ${task.isCompleted ? 'line-through text-muted-foreground' : ''}`}
              >
                {task.text}
              </span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeTask({ id: task._id })}
              >
                Delete
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}