"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Search, Globe } from "lucide-react";

export default function KnowledgePage() {
  const [tab, setTab] = useState<"search" | "ecosystem">("search");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [ecosystem, setEcosystem] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/ecosystem/some-slug")
      .then((r) => r.json())
      .then((data) => {
        if (data.title) setEcosystem([data]); // placeholder; later list all
      })
      .catch(() => {});
  }, []);

  const search = async () => {
    if (!query.trim()) return;
    // Mock search: just display query
    setResults([
      { title: "Mock result", snippet: `Found matches for "${query}"` },
    ]);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Knowledge Base</h1>
      <div className="border-b border-gray-800">
        <nav className="flex gap-6 text-sm font-medium">
          {["search", "ecosystem"].map((t) => (
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

      {tab === "search" && (
        <div>
          <div className="flex gap-2 mb-4">
            <input
              className="flex-1 bg-transparent border border-gray-700 rounded-xl px-4 py-2 text-sm"
              placeholder="Search across OpenClaw docs, skills, memory..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && search()}
            />
            <Button onClick={search}><Search className="w-4 h-4" /></Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent>
              {results.length === 0 ? (
                <p className="text-sm text-gray-400">Enter a query to search.</p>
              ) : (
                <ul className="divide-y divide-gray-800">
                  {results.map((r, i) => (
                    <li key={i} className="py-3">
                      <div className="text-sm font-medium">{r.title}</div>
                      <div className="text-xs text-gray-400">{r.snippet}</div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {tab === "ecosystem" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ecosystem.length === 0 && <p className="text-gray-400">No ecosystem products</p>}
          {ecosystem.map((p) => (
            <Card key={p.slug}>
              <CardHeader>
                <CardTitle>{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400">{p.description}</p>
                <div className="mt-2 text-xs text-gray-500">Health: {p.health}/100</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
