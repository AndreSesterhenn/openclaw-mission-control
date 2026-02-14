"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";

export default function ContentPage() {
  const [pipeline, setPipeline] = useState<any>({ columns: [], items: [] });

  useEffect(() => {
    fetch("/api/content-pipeline")
      .then((r) => r.json())
      .then((data) => setPipeline(data))
      .catch(() => {});
  }, []);

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      <h1 className="text-2xl font-bold mb-6">Content Pipeline</h1>
      <div className="flex-1 grid grid-cols-4 gap-6 overflow-x-auto">
        {pipeline.columns?.map((col: any) => (
          <div key={col.id} className="flex flex-col bg-white/5 rounded-2xl border border-white/10 min-w-[300px]">
            <div className="p-4 border-b border-gray-800 font-semibold flex justify-between items-center">
              <span>{col.title}</span>
              <span className="text-xs bg-gray-700 px-2 py-1 rounded">{col.count}</span>
            </div>
            <div className="flex-1 p-4 space-y-4">
              {pipeline.items?.filter((i: any) => i.column === col.id).map((item: any) => (
                <Card key={item.id} className="bg-gray-800/50 border-gray-700">
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0 text-xs text-gray-400">
                    {item.date}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="p-4 border-t border-gray-800">
              <Button variant="ghost" className="w-full text-sm">
                + Add item
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
