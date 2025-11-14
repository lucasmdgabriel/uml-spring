import { NextRequest, NextResponse } from 'next/server';
import { databaseUrl } from '@/app/utils/databaseUrl';

export async function GET(req: NextRequest) {
  return proxyHandler(req);
}

export async function POST(req: NextRequest) {
  return proxyHandler(req);
}

async function proxyHandler(req: NextRequest) {
  const urlPath = req.nextUrl.pathname.replace('/api/proxy/', '');
  const url = `${databaseUrl}/${urlPath}`;

  try {
    const body = req.method !== 'GET' ? await req.text() : undefined;

    const response = await fetch(url, {
      method: req.method,
      headers: Object.fromEntries(req.headers),
      body,
    });

    const data = await response.text();
    return new NextResponse(data, { status: response.status });
  } catch (err) {
    return new NextResponse(JSON.stringify({ error: 'Erro no proxy', details: err }), { status: 500 });
  }
}
