import { NextRequest, NextResponse } from 'next/server';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@kento-devlab.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'kento2024';

const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_ATTEMPTS = 5;

const rateLimitStore = new Map<string, { attempts: number; firstAttempt: number; blockedUntil: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  
  if (!record || now > record.blockedUntil) {
    rateLimitStore.set(ip, { attempts: 1, firstAttempt: now, blockedUntil: 0 });
    return true;
  }
  
  if (record.blockedUntil > now) {
    return false;
  }
  
  record.attempts += 1;
  
  if (record.attempts > MAX_ATTEMPTS) {
    record.blockedUntil = now + RATE_LIMIT_WINDOW * 3;
    rateLimitStore.set(ip, record);
    return false;
  }
  
  return true;
}

function sanitizeInput(input: string): string {
  return input.replace(/[<>\"'&]/g, '');
}

export async function POST(request: NextRequest) {
  const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] 
    || request.headers.get('x-real-ip') 
    || 'unknown';
  
  if (!checkRateLimit(clientIP)) {
    return NextResponse.json(
      { success: false, error: 'Demasiados intentos. Intenta de nuevo en 3 minutos.' },
      { status: 429, headers: { 'Retry-After': '180' } }
    );
  }

  try {
    const body = await request.json();
    const email = sanitizeInput(body.email || '');
    const password = body.password || '';

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email y contraseña requeridos' },
        { status: 400 }
      );
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin_session', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60,
        path: '/',
      });
      rateLimitStore.delete(clientIP);
      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Credenciales incorrectas' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Error interno' },
      { status: 500 }
    );
  }
}