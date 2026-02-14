import { defineSchema, defineTable } from "convex/server";
import { v4 as uuidv4 } from "uuid";

export const activities = defineTable({
  name: "activities",
  columns: {
    timestamp: "timestamp",
    type: "string",
    description: "string",
    metadata: "object | null",
  },
  indexes: ["type", "timestamp"],
});

export const calendarEvents = defineTable({
  name: "calendarEvents",
  columns: {
    title: "string",
    start: "timestamp",
    end: "timestamp",
    type: "string",
    description: "string | null",
  },
  indexes: ["start", "type"],
});

export const tasks = defineTable({
  name: "tasks",
  columns: {
    title: "string",
    status: "string",
    priority: "string | null",
    assignee: "string | null",
    dueDate: "timestamp | null",
    createdAt: "timestamp",
    updatedAt: "timestamp",
  },
  indexes: ["status", "priority", "assignee"],
});

export const contacts = defineTable({
  name: "contacts",
  columns: {
    name: "string",
    email: "string",
    company: "string | null",
    status: "string",
    lastContact: "timestamp | null",
    tags: "array<string>",
  },
  indexes: ["status", "company"],
});

export const contentDrafts = defineTable({
  name: "contentDrafts",
  columns: {
    title: "string",
    platform: "string",
    status: "string",
    body: "string | null",
    createdAt: "timestamp",
    updatedAt: "timestamp",
  },
  indexes: ["status", "platform"],
});

export const ecosystemProducts = defineTable({
  name: "ecosystemProducts",
  columns: {
    slug: "string",
    name: "string",
    status: "string",
    category: "string",
    health: "number",
    metrics: "object | null",
  },
  indexes: ["status", "category"],
});

export default defineSchema({
  activities,
  calendarEvents,
  tasks,
  contacts,
  contentDrafts,
  ecosystemProducts,
});
