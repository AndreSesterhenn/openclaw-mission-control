"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Send } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/chat-history")
      .then((r) => r.json())
      .then((data) => setMessages(data.messages || []))
      .catch(() => {});
  }, []);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), role: "user", content: input, channel: "telegram", timestamp: new Date().toISOString() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    await fetch("/api/chat-send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg.content, channel: userMsg.channel }),
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>Agent Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  m.role === "user" ? "bg-primary text-primary-foreground" : "bg-white/10 text-white"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </CardContent>
        <div className="p-4 border-t border-gray-800 flex gap-2">
          <input
            className="flex-1 bg-transparent border border-gray-700 rounded-xl px-4 py-2 text-sm"
            placeholder="Type a command or message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <Button size="icon" onClick={send}><Send className="w-4 h-4" /></Button>
        </div>
      </Card>
    </div>
  );
}
