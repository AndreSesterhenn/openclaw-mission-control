"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Button } from "@/components/button";

export default function OpsPage() {
  const [tab, setTab] = useState<"operations" | "tasks" | "calendar">("operations");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Operations Center</h1>
      <div className="border-b border-gray-800">
        <nav className="flex gap-6 text-sm font-medium">
          {["operations", "tasks", "calendar"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`pb-2 border-b-2 ${
                tab === t
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {tab === "operations" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Server Health</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">Data from /api/system-state</p>
              <pre className="mt-2 text-xs bg-black/30 p-2 rounded">{`{ gateway: "ok", shell: "ok", ... }`}</pre>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Branch Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">Git branch check</p>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Observations Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">Recent system observations</p>
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "tasks" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Suggested Tasks</h2>
          <p className="text-gray-400">Cards from /api/suggested-tasks with approve/reject</p>
        </div>
      )}

      {tab === "calendar" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Calendar</h2>
          <p className="text-gray-400">Weekly view from Convex calendarEvents</p>
        </div>
      )}
    </div>
  );
}
