import { NextResponse } from "next/server";
import { execSync } from "child_process";

export async function GET() {
  try {
    // Scan common project directories
    const dirs = ["~/Desktop/Projects", "~/projects", "~/code"];
    const repos: any[] = [];

    for (const dir of dirs) {
      try {
        const fullDir = dir.replace("~", process.env.HOME || "/home/clawdia");
        const list = execSync(`find "${fullDir}" -name ".git" -type d 2>/dev/null`, { encoding: "utf8" });
        const gitDirs = list.split("\n").filter(Boolean);
        for (const gitDir of gitDirs) {
          const repoPath = gitDir.replace("/.git", "");
          try {
            const name = repoPath.split("/").pop() || "unknown";
            const branch = execSync(`git -C "${repoPath}" rev-parse --abbrev-ref HEAD`, { encoding: "utf8" }).trim();
            const lastCommit = execSync(`git -C "${repoPath}" log -1 --format=%cd --date=relative`, { encoding: "utf8" }).trim();
            repos.push({
              name,
              path: repoPath,
              branch,
              lastCommit,
            });
          } catch (e) {
            // skip
          }
        }
      } catch (e) {
        // skip directory
      }
    }
    return NextResponse.json({ repos, total: repos.length });
  } catch (e) {
    return NextResponse.json({ repos: [], total: 0 });
  }
}
