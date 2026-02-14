import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const WORKSPACE = process.env.OPENCLAW_WORKSPACE || "/home/clawdia/.openclaw/workspace";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    // Try to read a memory file for this ecosystem product
    const possiblePaths = [
      path.join(WORKSPACE, `memory/${slug}.md`),
      path.join(WORKSPACE, `projects.md`), // fallback
    ];
    let content = "";
    for (const p of possiblePaths) {
      try {
        content = await readFile(p, "utf8");
        break;
      } catch {
        continue;
      }
    }
    if (!content) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    // Simple extraction: title and first paragraph
    const titleMatch = content.match(/^# (.+)/m);
    const title = titleMatch ? titleMatch[1] : slug;
    const descMatch = content.match(/\n\n(.+)/);
    const description = descMatch ? descMatch[1].slice(0, 200) : "";
    return NextResponse.json({
      slug,
      title,
      description,
      updated: new Date().toISOString(),
    });
  } catch (e) {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
