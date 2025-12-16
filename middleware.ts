import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const KEYSTATIC_USERNAME = process.env.KEYSTATIC_USERNAME || 'admin';
const KEYSTATIC_PASSWORD = process.env.KEYSTATIC_PASSWORD || 'sway2024';

export function middleware(request: NextRequest) {
  // Sprawdź czy to ścieżka keystatic (ale nie API logowania)
  const isKeystatic = request.nextUrl.pathname.startsWith('/keystatic') || 
                      request.nextUrl.pathname.startsWith('/api/keystatic');
  
  if (!isKeystatic) {
    return NextResponse.next();
  }

  // Sprawdź cookie autoryzacji
  const authCookie = request.cookies.get('keystatic-auth')?.value;

  if (!authCookie) {
    // Przekieruj na stronę logowania
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Zweryfikuj token
  try {
    const decoded = atob(authCookie);
    const [user, pwd] = decoded.split(':');

    if (user !== KEYSTATIC_USERNAME || pwd !== KEYSTATIC_PASSWORD) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/keystatic/:path*', '/api/keystatic/:path*'],
};
