import { NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import path from "path";

const STATE_DIR = process.env.OPENCLAW_WORKSPACE
  ? path.join(process.env.OPENCLAW_WORKSPACE, "state")
  : "/home/clawdia/.openclaw/workspace/state";

const FILE = path.join(STATE_DIR, "suggested-tasks.json");

export async function GET() {
  try {
    const data = await readFile(FILE, "utf8");
    const tasks = JSON.parse(data);
    return NextResponse.json({ tasks });
  } catch (e) {
    // Return empty if file doesn't exist
    return NextResponse.json({ tasks: [] });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, taskId } = body;
    // For now, just log. Later implement approve/reject persistence.
    return NextResponse.json({ ok: true, action, taskId });
  } catch (e) {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }
}
