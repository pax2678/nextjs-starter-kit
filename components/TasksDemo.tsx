"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";

export function TasksDemo() {
  return (
    <>
      <AuthLoading>
        <div className="max-w-md mx-auto mt-8 p-6 bg-card rounded-lg border text-center">
          <div className="h-8 w-32 bg-muted animate-pulse rounded mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </AuthLoading>

      <Authenticated>
        <AuthenticatedTasksContent />
      </Authenticated>

      <Unauthenticated>
        <div className="max-w-md mx-auto mt-8 p-6 bg-card rounded-lg border text-center">
          <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
          <p className="text-muted-foreground mb-4">
            Please sign in to manage your personal tasks and see your progress.
          </p>
          <p className="text-sm text-muted-foreground">
            Use the sign in button in the header above to get started.
          </p>
        </div>
      </Unauthenticated>
    </>
  );
}

function AuthenticatedTasksContent() {
  const tasks = useQuery(api.tasks.get);
  const createTask = useMutation(api.tasks.create);
  const toggleTask = useMutation(api.tasks.toggle);
  const removeTask = useMutation(api.tasks.remove);
  const storeUser = useMutation(api.users.store);
  
  const [newTaskText, setNewTaskText] = useState("");

  // Auto-store user in Convex when component mounts (user is guaranteed to be authenticated)
  useEffect(() => {
    storeUser();
  }, [storeUser]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      await createTask({ text: newTaskText.trim() });
      setNewTaskText("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-card rounded-lg border">
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
      
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