import { NextResponse } from "next/server";
import { execSync } from "child_process";

export async function GET() {
  try {
    const crontab = execSync("crontab -l 2>&1 || true", { encoding: "utf8" });
    const lines = crontab.split("\n").filter((l) => l.trim() && !l.startsWith("#"));

    const jobs = lines.map((line, idx) => {
      const parts = line.split(/\s+/);
      const schedule = parts.slice(0, 5).join(" ");
      const command = parts.slice(5).join(" ");
      const name = command.includes("backup-clawdia.sh") ? "Daily Backup" : command.split("/").pop() || `Job ${idx}`;
      return {
        id: `job-${idx}`,
        name,
        schedule,
        command,
        status: "healthy",
        lastRun: null,
        errors: 0,
      };
    });

    return NextResponse.json({ jobs, total: jobs.length });
  } catch (e) {
    return NextResponse.json({ jobs: [], total: 0 });
  }
}
