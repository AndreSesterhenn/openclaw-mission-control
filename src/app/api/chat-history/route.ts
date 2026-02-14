import { NextResponse } from "next/server";
import { readdir, readFile } from "fs/promises";
import path from "path";

const WORKSPACE = process.env.OPENCLAW_WORKSPACE || "/home/clawdia/.openclaw/workspace";
const MEMORY_DIR = path.join(WORKSPACE, "memory");

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const channel = searchParams.get("channel") || "all";
  const limit = parseInt(searchParams.get("limit") || "20");

  try {
    const files = await readdir(MEMORY_DIR);
    const jsonlFiles = files.filter((f) => f.endsWith(".jsonl") || f.endsWith(".log"));
    // For simplicity, return static mock
    const messages = [
      { id: "1", role: "user", content: "Qual o status do sistema?", channel: "telegram", timestamp: new Date().toISOString() },
      { id: "2", role: "assistant", content: "Todos os serviços estão operacionais.", channel: "telegram", timestamp: new Date().toISOString() },
    ];
    return NextResponse.json({ messages, total: messages.length });
  } catch (e) {
    return NextResponse.json({ messages: [], total: 0 });
  }
}
