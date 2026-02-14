import { NextResponse } from "next/server";
import { promisify } from "util";
import { exec } from "child_process";

const execAsync = promisify(exec);
const WORKSPACE = process.env.OPENCLAW_WORKSPACE || "/home/clawdia/.openclaw/workspace";

export async function GET() {
  const fs = await import("fs");
  const path = await import("path");

  // Gateway status
  let gateway = { status: "down", uptime: "0s" };
  try {
    const { stdout } = await execAsync("openclaw gateway status", { timeout: 3000 });
    const up = stdout.includes("running") || stdout.includes("active");
    gateway = { status: up ? "ok" : "down", uptime: up ? "running" : "stopped" };
  } catch (e) {
    gateway = { status: "error", uptime: "0s" };
  }

  // Shell API
  let shell = { status: "down", port: 8001 };
  try {
    const { stdout } = await execAsync("curl -s --connect-timeout 2 http://localhost:8001/status 2>&1 || true", { timeout: 3000 });
    shell = { status: stdout.includes('"status":"ok"') ? "ok" : "down", port: 8001 };
  } catch (e) {
    shell = { status: "error", port: 8001 };
  }

  // Agents (skills registry)
  let agents = { total: 0, active: 0 };
  try {
    const registryPath = path.join(WORKSPACE, "skills/registry.json");
    if (fs.existsSync(registryPath)) {
      const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
      agents.total = Object.keys(registry.skills || {}).length;
      // Count active sessions (lines containing "agent:" minus header)
      try {
        const { stdout } = await execAsync("/home/clawdia/.local/bin/openclaw sessions list --limit 20 2>&1 || true", { timeout: 3000 });
        const lines = stdout.split("\n").filter(line => line.includes("agent:"));
        agents.active = lines.length;
      } catch (e) {
        console.error("Error counting sessions:", e);
        agents.active = 0;
      }
    }
  } catch (e) {
    console.error("Error loading agents:", e);
    agents = { total: 0, active: 0 };
  }

  // Cron health
  let crons = { total: 0, healthy: 0 };
  try {
    const { stdout } = await execAsync("crontab -l 2>&1 || true", { timeout: 3000 });
    const lines = stdout.split("\n").filter((l) => l.includes("backup-clawdia") || l.includes("clawdia"));
    crons = { total: lines.length, healthy: lines.length };
  } catch {
    crons = { total: 0, healthy: 0 };
  }

  // Backups
  let backups = { last: "None", next: "02:00" };
  try {
    const { stdout } = await execAsync("ls -lt ~/backup-clawdia/workspace/*.tar.gz 2>/dev/null | head -1 || true", { timeout: 3000 });
    if (stdout.trim()) {
      const parts = stdout.trim().split(/\s+/);
      const filepath = parts[parts.length - 1] || "unknown";
      const filename = filepath.split('/').pop() || filepath;
      backups.last = filename.replace(/^workspace-/, "").replace(/\.tar\.gz.*$/, "");
    }
  } catch {
    backups = { last: "None", next: "02:00" };
  }

  return NextResponse.json({
    gateway,
    shell,
    agents,
    crons,
    backups,
  });
}
