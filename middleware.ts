import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

export default function middleware(req: NextRequest) {
  // Check for protected routes
  const { pathname } = req.nextUrl;
  
  // Regex to match /en/account or /ar/account or just /account
  const isAccountPage = pathname.match(/^\/(en|ar)?\/?account/);
  const isLoginPage = pathname.match(/^\/(en|ar)?\/?account\/login/);
  const isRegisterPage = pathname.match(/^\/(en|ar)?\/?account\/register/);
  
  // Check for Customer Access Token
  const customerToken = req.cookies.get('customerAccessToken');

  // If trying to access account pages without token, redirect to login
  if (isAccountPage && !isLoginPage && !isRegisterPage && !customerToken) {
    const locale = req.nextUrl.pathname.startsWith('/ar') ? 'ar' : 'en';
    return NextResponse.redirect(new URL(`/${locale}/account/login`, req.url));
  }

  // If has token and tries to go to login, redirect to account
  if ((isLoginPage || isRegisterPage) && customerToken) {
    const locale = req.nextUrl.pathname.startsWith('/ar') ? 'ar' : 'en';
    return NextResponse.redirect(new URL(`/${locale}/account`, req.url));
  }

  return intlMiddleware(req);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};