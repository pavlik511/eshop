import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Díváme se, jestli se uživatel cpe do sekce /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // 2. Koukneme mu na ruku, jestli má razítko (cookie jménem 'admin_session')
    const hasStamp = request.cookies.has('admin_session');

    // 3. Pokud nemá razítko a ještě není na přihlašovací stránce, vyhodíme ho tam
    if (!hasStamp && request.nextUrl.pathname !== '/admin/login') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  // Jinak ho pustíme dál (na zbytek webu, kde si lidi normálně kupují pizzu)
  return NextResponse.next();
}

// Tímhle říkáme, ať vyhazovač nehlídá obrázky a běžný web, ale jen složku admin
export const config = {
  matcher: ['/admin/:path*'],
};