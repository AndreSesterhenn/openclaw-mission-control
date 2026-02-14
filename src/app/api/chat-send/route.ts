import { NextResponse } from "next/server";
import { writeFile, appendFile } from "fs/promises";
import path from "path";

const WORKSPACE = process.env.OPENCLAW_WORKSPACE || "/home/clawdia/.openclaw/workspace";
const QUEUE_FILE = path.join(WORKSPACE, "state/chat-queue.jsonl");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, channel = "telegram", userId } = body;
    if (!message) {
      return NextResponse.json({ error: "message required" }, { status: 400 });
    }
    const record = {
      id: Date.now().toString(),
      message,
      channel,
      userId,
      timestamp: new Date().toISOString(),
    };
    await appendFile(QUEUE_FILE, JSON.stringify(record) + "\n");
    return NextResponse.json({ ok: true, queued: true });
  } catch (e) {
    return NextResponse.json({ error: "failed to queue" }, { status: 500 });
  }
}
