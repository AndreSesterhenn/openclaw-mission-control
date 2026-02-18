import { NextRequest, NextResponse } from 'next/server';

// Carrega o artifact-registry-js do caminho absoluto
const registryPath = '/home/clawdia/.openclaw/workspace/artifact-registry-js';
const { registerArtifact, getArtifact, listArtifacts } = require(registryPath);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filters: any = {};
    if (searchParams.has('type')) filters.type = searchParams.get('type');
    if (searchParams.has('source')) filters.source = searchParams.get('source');
    const limit = searchParams.has('limit') ? parseInt(searchParams.get('limit')!) : undefined;

    const artifacts = listArtifacts(filters, limit);
    return NextResponse.json({ status: 'ok', count: artifacts.length, artifacts });
  } catch (err: any) {
    return NextResponse.json({ status: 'error', error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, source, metadata, expires } = body;
    if (!type || !source || !metadata) {
      return NextResponse.json({ status: 'error', message: 'Campos type, source, metadata obrigatórios' }, { status: 400 });
    }
    const artifactId = registerArtifact(type, source, metadata, undefined, expires);
    const artifact = getArtifact(artifactId);
    return NextResponse.json({ status: 'ok', artifact });
  } catch (err: any) {
    return NextResponse.json({ status: 'error', error: err.message }, { status: 500 });
  }
}