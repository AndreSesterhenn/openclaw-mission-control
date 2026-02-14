import { NextResponse } from "next/server";

export async function GET() {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();
  return NextResponse.json({
    status: "ok",
    uptime,
    memory: memoryUsage,
    timestamp: new Date().toISOString(),
  });
}
