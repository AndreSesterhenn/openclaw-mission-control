"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Cpu, CheckCircle } from "lucide-react";

export default function AgentsPage() {
  const [tab, setTab] = useState<"skills" | "models">("skills");
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/agents")
      .then((r) => r.json())
      .then((data) => setSkills(data.skills || []))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Agents & Models</h1>
      <div className="border-b border-gray-800">
        <nav className="flex gap-6 text-sm font-medium">
          {["skills", "models"].map((t) => (
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

      {tab === "skills" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.length === 0 && <p className="text-gray-400">Loading skills...</p>}
          {skills.map((s) => (
            <Card key={s.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">{s.name}</CardTitle>
                <span className="text-2xl">{s.emoji}</span>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-gray-400 mb-2">{s.description}</div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{s.status}</span>
                </div>
                <div className="text-xs text-gray-400 mt-2">v{s.version}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "models" && (
        <Card>
          <CardHeader>
            <CardTitle>Model Configurations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-400">List of configured AI models</p>
            <table className="w-full mt-4 text-sm">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="text-left py-2">Model</th>
                  <th className="text-left py-2">Provider</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-right py-2">Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-2">OpenRouter Step</td>
                  <td className="py-2">OpenRouter</td>
                  <td className="py-2"><CheckCircle className="w-4 h-4 text-green-500" /></td>
                  <td className="text-right py-2">$0.00</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
