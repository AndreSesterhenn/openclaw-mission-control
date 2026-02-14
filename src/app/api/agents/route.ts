import { NextResponse } from "next/server";

export async function GET() {
  const fs = await import("fs");
  const path = await import("path");

  const workspace = process.env.OPENCLAW_WORKSPACE || "/home/clawdia/.openclaw/workspace";
  const registryPath = path.join(workspace, "skills/registry.json");

  if (!fs.existsSync(registryPath)) {
    return NextResponse.json({ skills: [] });
  }

  const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  const skills = Object.entries(registry.skills || {}).map(([key, info]: [string, any]) => ({
    id: key,
    name: info.displayName || key,
    version: info.version,
    emoji: info.emoji || "📦",
    description: info.description?.split("\n")[0].slice(0, 80) || "",
    status: "loaded",
  }));

  return NextResponse.json({ skills, count: skills.length });
}
