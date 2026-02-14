import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const WORKSPACE = process.env.OPENCLAW_WORKSPACE || "/home/clawdia/.openclaw/workspace";
const PRIORITIES_FILE = path.join(WORKSPACE, "HEARTBEAT.md");

export async function GET() {
  try {
    const data = await readFile(PRIORITIES_FILE, "utf8");
    // Extrair itens de checklist
    const tasks = data
      .split("\n")
      .filter((line) => line.startsWith("- [ ]") || line.startsWith("- [x]"))
      .map((line) => ({
        text: line.replace(/^- \[( |x)\] /, ""),
        done: line.startsWith("- [x]"),
      }));
    return NextResponse.json({ priorities: tasks });
  } catch (e) {
    return NextResponse.json({ priorities: [] });
  }
}
