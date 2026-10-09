import { NextResponse, type NextRequest } from 'next/server';

/** `/` and `/news` answer `Accept: text/markdown` with markdown and everyone else with HTML. */
export function middleware(req: NextRequest) {
  const accept = req.headers.get('accept') ?? '';
  if (!accept.includes('text/markdown') || accept.includes('text/html')) return NextResponse.next();

  const target = req.nextUrl.pathname === '/news' ? '/news/md' : '/.well-known/home.md';
  const res = NextResponse.rewrite(new URL(target, req.url));
  res.headers.set('Vary', 'Accept');
  return res;
}

export const config = { matcher: ['/', '/news'] };
