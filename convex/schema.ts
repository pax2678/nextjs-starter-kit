import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
    createdAt: v.number(),
  }),
  
  users: defineTable({
    name: v.string(),
    email: v.string(),
    createdAt: v.number(),
  }).index("by_email", ["email"]),
});