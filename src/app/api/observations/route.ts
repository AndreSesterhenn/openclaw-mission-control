import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const WORKSPACE = process.env.OPENCLAW_WORKSPACE || "/home/clawdia/.openclaw/workspace";
const OBS_FILE = path.join(WORKSPACE, "state/observations.md");

export async function GET() {
  try {
    const data = await readFile(OBS_FILE, "utf8");
    const lines = data.split("\n").slice(0, 50); // last 50 lines
    return NextResponse.json({ observations: lines.join("\n") });
  } catch (e) {
    return NextResponse.json({ observations: "No observations yet." });
  }
}
