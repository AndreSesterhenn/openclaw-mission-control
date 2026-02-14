"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { GitBranch, Clock } from "lucide-react";

export default function CodePage() {
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/repos")
      .then((r) => r.json())
      .then((data) => setRepos(data.repos || []))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Code Pipeline</h1>
      <Card>
        <CardHeader>
          <CardTitle>Git Repositories</CardTitle>
        </CardHeader>
        <CardContent>
          {repos.length === 0 ? (
            <p className="text-gray-400">No repositories found in ~/Desktop/Projects, ~/projects, ~/code</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="text-left py-2">Repo</th>
                  <th className="text-left py-2">Branch</th>
                  <th className="text-left py-2">Last Commit</th>
                  <th className="text-right py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {repos.map((repo) => (
                  <tr key={repo.name}>
                    <td className="py-2 font-medium">{repo.name}</td>
                    <td className="py-2">
                      <span className="inline-flex items-center gap-1 text-xs bg-gray-800 px-2 py-1 rounded">
                        <GitBranch className="w-3 h-3" /> {repo.branch}
                      </span>
                    </td>
                    <td className="py-2 text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {repo.lastCommit}
                    </td>
                    <td className="text-right py-2">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
