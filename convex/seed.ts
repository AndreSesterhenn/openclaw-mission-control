import { internalSeed } from "convex/seed";
import { db } from "convex/server";
import { 
  activities, 
  calendarEvents, 
  tasks, 
  contacts, 
  contentDrafts, 
  ecosystemProducts 
} from "./schema";

async function runSeed() {
  // Example seed data; adapt later
  await internalSeed(
    db,
    db.activities,
    (i) => ({
      name: `Activity ${i}`,
      timestamp: new Date(),
      type: "system",
      description: "System started",
      metadata: null,
    }),
    10
  );

  await internalSeed(
    db,
    db.tasks,
    (i) => ({
      title: `Task ${i}`,
      status: "open",
      priority: i % 2 === 0 ? "high" : "normal",
      assignee: null,
      dueDate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    20
  );
}

runSeed().catch(console.error);
