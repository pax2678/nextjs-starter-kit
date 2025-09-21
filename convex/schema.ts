import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
    createdAt: v.number(),
    userId: v.optional(v.string()), // Clerk user ID - optional for migration
  }).index("by_user", ["userId"]),
  
  users: defineTable({
    name: v.string(),
    email: v.string(),
    createdAt: v.number(),
    clerkId: v.string(), // Clerk user ID
  }).index("by_email", ["email"])
   .index("by_clerk_id", ["clerkId"]),
});