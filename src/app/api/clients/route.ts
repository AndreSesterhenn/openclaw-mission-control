import { NextResponse } from "next/server";
import { readdir, readFile } from "fs/promises";
import path from "path";

const WORKSPACE = process.env.OPENCLAW_WORKSPACE || "/home/clawdia/.openclaw/workspace";
const CLIENTS_DIR = path.join(WORKSPACE, "clients");

export async function GET() {
  try {
    const exists = await readdir(CLIENTS_DIR).then(() => true).catch(() => false);
    if (!exists) {
      return NextResponse.json({ clients: [] });
    }
    const files = await readdir(CLIENTS_DIR);
    const clients = [];
    for (const file of files) {
      if (file.endsWith(".md")) {
        const content = await readFile(path.join(CLIENTS_DIR, file), "utf8");
        const nameMatch = content.match(/^# (.+)/);
        const statusMatch = content.match(/\*\*Status\*\*:? (.+)/);
        clients.push({
          id: file.replace(".md", ""),
          name: nameMatch ? nameMatch[1] : file,
          status: statusMatch ? statusMatch[1] : "unknown",
          lastUpdated: new Date().toISOString(),
        });
      }
    }
    return NextResponse.json({ clients, total: clients.length });
  } catch (e) {
    return NextResponse.json({ clients: [] });
  }
}
