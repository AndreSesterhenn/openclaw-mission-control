"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Activity, Cpu, Clock, Server, Bot, Calendar, FileText, MessageSquare } from "lucide-react";

interface SystemState {
  gateway: { status: string; uptime: string };
  shell: { status: string; port: number };
  backups: { last: string; next: string };
  agents: { total: number; active: number };
}

export default function HomePage() {
  const [system, setSystem] = useState<SystemState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/system-state")
      .then((res) => res.json())
      .then((data) => {
        setSystem(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const cards = [
    {
      title: "System Health",
      icon: Server,
      status: system?.gateway.status === "ok" ? "healthy" : "down",
      detail: system?.gateway.uptime || "N/A",
    },
    {
      title: "Agent Status",
      icon: Bot,
      status: system?.agents.active ? "healthy" : "idle",
      detail: `${system?.agents.active || 0} active / ${system?.agents.total || 0} total`,
    },
    {
      title: "Cron Health",
      icon: Clock,
      status: "healthy",
      detail: "All jobs running",
    },
    {
      title: "Shell API",
      icon: Activity,
      status: system?.shell.status === "ok" ? "healthy" : "down",
      detail: `Port ${system?.shell.port || 8001}`,
    },
    {
      title: "Backups",
      icon: FileText,
      status: "healthy",
      detail: system?.backups.last || "None yet",
    },
    {
      title: "Quick Stats",
      icon: Cpu,
      status: "healthy",
      detail: "24/7 operational",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <header className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Mission Control</h1>
        <p className="text-gray-400 text-sm mt-1">OpenClaw AI Agent Dashboard</p>
      </header>

      <nav className="max-w-7xl mx-auto mb-8 border-b border-gray-800">
        <ul className="flex space-x-8 text-sm font-medium">
          {["HOME", "OPS", "AGENTS", "CHAT", "CONTENT", "COMMS", "KNOWLEDGE", "CODE"].map((item) => (
            <li key={item}>
              <Link
                href={`/${item.toLowerCase()}`}
                className={`py-3 px-1 border-b-2 transition-colors ${
                  item === "HOME"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div
              key={card.title}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-sm transition hover:bg-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <card.icon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    card.status === "healthy" ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span className="text-sm text-gray-300">{card.detail}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90">
              Trigger Backup
            </button>
            <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:opacity-90">
              Restart Gateway
            </button>
            <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:opacity-90">
              Compaction Now
            </button>
            <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:opacity-90">
              View Logs
            </button>
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto mt-12 text-center text-gray-500 text-sm">
        Mission Control Dashboard — Built for Clawdia • {new Date().getFullYear()}
      </footer>
    </div>
  );
}
