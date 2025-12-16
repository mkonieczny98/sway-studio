import { NextResponse } from 'next/server';

const KEYSTATIC_USERNAME = process.env.KEYSTATIC_USERNAME || 'admin';
const KEYSTATIC_PASSWORD = process.env.KEYSTATIC_PASSWORD || 'sway2024';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (username === KEYSTATIC_USERNAME && password === KEYSTATIC_PASSWORD) {
      // Tworzymy token sesji (base64 encoded credentials)
      const token = btoa(`${username}:${password}`);
      
      const response = NextResponse.json({ success: true });
      
      // Ustawiamy cookie z tokenem autoryzacji
      response.cookies.set('keystatic-auth', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 dni
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Nieprawidłowy login lub hasło' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Wystąpił błąd serwera' },
      { status: 500 }
    );
  }
}
