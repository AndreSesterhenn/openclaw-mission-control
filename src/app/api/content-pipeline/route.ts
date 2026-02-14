import { NextResponse } from "next/server";

export async function GET() {
  // Leitura simples de arquivos de memória para montar kanban
  // Por enquanto retorna estático; depois integrar com projects.md e active-tasks.md
  const columns = [
    { id: "draft", title: "Draft", count: 2 },
    { id: "review", title: "Review", count: 1 },
    { id: "approved", title: "Approved", count: 0 },
    { id: "published", title: "Published", count: 3 },
  ];

  const items = [
    { id: "1", title: "Plano Mestre v3", column: "draft", date: "2026-02-12" },
    { id: "2", title: "Skill bus-search", column: "draft", date: "2026-02-13" },
    { id: "3", title: "Disaster Recovery Doc", column: "published", date: "2026-02-12" },
  ];

  return NextResponse.json({ columns, items });
}
