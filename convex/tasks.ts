import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all tasks for the current user
export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    return await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .order("desc")
      .collect();
  },
});

// Clean up old tasks without userId (migration helper)
export const cleanupOldTasks = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("userId"), undefined))
      .collect();
  },
});

// Delete all old tasks without userId
export const deleteOldTasks = mutation({
  args: {},
  handler: async (ctx) => {
    const oldTasks = await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("userId"), undefined))
      .collect();
    
    for (const task of oldTasks) {
      await ctx.db.delete(task._id);
    }
    
    return { deleted: oldTasks.length };
  },
});

// Create a new task
export const create = mutation({
  args: { 
    text: v.string() 
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    const taskId = await ctx.db.insert("tasks", {
      text: args.text,
      isCompleted: false,
      createdAt: Date.now(),
      userId: identity.subject,
    });
    return taskId;
  },
});

// Toggle task completion
export const toggle = mutation({
  args: { 
    id: v.id("tasks") 
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    const task = await ctx.db.get(args.id);
    if (!task) {
      throw new Error("Task not found");
    }
    
    if (task.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }
    
    await ctx.db.patch(args.id, {
      isCompleted: !task.isCompleted,
    });
  },
});

// Delete a task
export const remove = mutation({
  args: { 
    id: v.id("tasks") 
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    
    const task = await ctx.db.get(args.id);
    if (!task) {
      throw new Error("Task not found");
    }
    
    if (task.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }
    
    await ctx.db.delete(args.id);
  },
});