import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Dane logowania do panelu Keystatic
const KEYSTATIC_USERNAME = process.env.KEYSTATIC_USERNAME || 'admin';
const KEYSTATIC_PASSWORD = process.env.KEYSTATIC_PASSWORD || 'sway2024';

export function middleware(request: NextRequest) {
  // Sprawdź czy to ścieżka keystatic
  if (request.nextUrl.pathname.startsWith('/keystatic') || 
      request.nextUrl.pathname.startsWith('/api/keystatic')) {
    
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return new NextResponse('Wymagana autoryzacja', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Keystatic Admin"',
        },
      });
    }

    const authValue = authHeader.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    if (user !== KEYSTATIC_USERNAME || pwd !== KEYSTATIC_PASSWORD) {
      return new NextResponse('Nieprawidłowe dane logowania', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Keystatic Admin"',
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/keystatic/:path*', '/api/keystatic/:path*'],
};
