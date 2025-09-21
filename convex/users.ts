import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all users
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").order("desc").collect();
  },
});

// Get user by email
export const getByEmail = query({
  args: { 
    email: v.string() 
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

// Create a new user
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
    
    if (existingUser) {
      throw new Error("User with this Clerk ID already exists");
    }
    
    const userId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      clerkId: args.clerkId,
      createdAt: Date.now(),
    });
    return userId;
  },
});

// Store current user info from Clerk (auto-creates user if doesn't exist)
export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (existingUser) {
      // User exists, return their ID
      return existingUser._id;
    }

    // Create new user
    const userId = await ctx.db.insert("users", {
      name: identity.name || identity.email || "Anonymous",
      email: identity.email || "",
      clerkId: identity.subject,
      createdAt: Date.now(),
    });

    return userId;
  },
});