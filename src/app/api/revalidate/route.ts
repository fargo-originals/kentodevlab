import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidate-secret');
  if (!secret || secret !== process.env.LANDING_REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const tags: string[] = Array.isArray(body.tags)
    ? body.tags
    : ['landing:snapshot', 'landing:blog'];
  tags.forEach(tag => revalidateTag(tag, 'max'));
  return NextResponse.json({ revalidated: tags, ts: Date.now() });
}
