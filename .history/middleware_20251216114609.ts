import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Middleware wyłączony - Keystatic używa GitHub OAuth na produkcji
  // Lokalnie działa bez autoryzacji (development)
  return NextResponse.next();
}

// Pusty matcher = middleware się nie odpala
export const config = {
  matcher: [],
};
