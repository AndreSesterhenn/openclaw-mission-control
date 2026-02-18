export const dynamic = 'force-dynamic'; // Sempre server-side

import Link from 'next/link';
import { NextRequest, NextResponse } from 'next/server';

async function getArtifacts(limit = 20) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/artifacts?limit=${limit}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.artifacts || [];
}

export default async function ArtifactsPage({ searchParams }: { searchParams: { limit?: string } }) {
  const limit = parseInt(searchParams.limit || '20');
  const artifacts = await getArtifacts(limit);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Artifacts Registry</h1>
      <div className="mb-4">
        <Link href="/" className="text-blue-500 hover:underline">← Voltar ao Dashboard</Link>
      </div>
      {artifacts.length === 0 ? (
        <p className="text-gray-500">Nenhum artifact registrado.</p>
      ) : (
        <div className="grid gap-4">
          {artifacts.map((art: any) => (
            <div key={art.id} className="border rounded-lg p-4 bg-white/5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{art.metadata.title || art.id}</h3>
                  <p className="text-sm text-gray-400">
                    Tipo: {art.type} | Fonte: {art.source} | Criado: {new Date(art.created).toLocaleString()}
                  </p>
                  {art.expires && (
                    <p className="text-xs text-orange-400">Expira: {new Date(art.expires).toLocaleString()}</p>
                  )}
                </div>
                <span className="text-xs bg-blue-900 text-blue-200 px-2 py-1 rounded">{art.id.slice(0, 8)}...</span>
              </div>
              <details className="mt-2">
                <summary className="cursor-pointer text-sm text-gray-300 hover:text-white">Ver metadata</summary>
                <pre className="mt-2 text-xs bg-black/30 p-2 rounded overflow-auto max-h-60">
                  {JSON.stringify(art.metadata, null, 2)}
                </pre>
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}