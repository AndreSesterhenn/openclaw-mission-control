"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { MessageSquare, Users } from "lucide-react";

export default function CommsPage() {
  const [tab, setTab] = useState<"messages" | "clients">("messages");
  const [clients, setClients] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/clients")
      .then((r) => r.json())
      .then((data) => setClients(data.clients || []))
      .catch(() => {});
    fetch("/api/chat-history?limit=10")
      .then((r) => r.json())
      .then((data) => setMessages(data.messages || []))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Communications</h1>
      <div className="border-b border-gray-800">
        <nav className="flex gap-6 text-sm font-medium">
          {["messages", "clients"].map((t) => (
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

      {tab === "messages" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Messages</CardTitle>
            <MessageSquare className="w-5 h-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-gray-800">
              {messages.length === 0 && <li className="py-2 text-gray-400">No messages</li>}
              {messages.map((m) => (
                <li key={m.id} className="py-3 flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium">{m.role === "user" ? "User" : "Clawdia"}</div>
                    <div className="text-xs text-gray-400 truncate max-w-md">{m.content}</div>
                  </div>
                  <time className="text-xs text-gray-500">{new Date(m.timestamp).toLocaleTimeString()}</time>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {tab === "clients" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Clients</CardTitle>
            <Users className="w-5 h-5 text-gray-400" />
          </CardHeader>
          <CardContent>
            {clients.length === 0 ? (
              <p className="text-gray-400">No client records yet.</p>
            ) : (
              <ul className="divide-y divide-gray-800">
                {clients.map((c) => (
                  <li key={c.id} className="py-3">
                    <div className="text-sm font-medium">{c.name}</div>
                    <div className="text-xs text-gray-400">{c.status}</div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
