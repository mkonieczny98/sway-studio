import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Usuwamy cookie autoryzacji
  response.cookies.delete('keystatic-auth');
  
  return response;
}
