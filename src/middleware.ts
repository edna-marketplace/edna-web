import { jwtDecode } from "jwt-decode"
import { NextRequest, NextResponse } from "next/server"
import { destroyCookie } from "nookies"

const publicRoutes = [
  { path: '/signin', whenAuthenticated: 'redirect' },
  { path: '/signup', whenAuthenticated: 'redirect' },
  { path: '/signup/register-address', whenAuthenticated: 'redirect' },
  { path: '/signup/register-schedule', whenAuthenticated: 'redirect' },
  { path: '/signup/register-password', whenAuthenticated: 'redirect' },
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED = '/signin'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const publicRoute = publicRoutes.find(route => route.path === path)
  const authToken = request.cookies.get('@edna:auth-token')

  if (!authToken && publicRoute) {
    return NextResponse.next()
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED

    return NextResponse.redirect(redirectUrl)
  }

  if (authToken && publicRoute && publicRoute.whenAuthenticated === 'redirect') {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = '/'

    return NextResponse.redirect(redirectUrl)
  }

  if (authToken && !publicRoute) {
    const decodedToken: any = jwtDecode(authToken.value)

    if (decodedToken.exp * 1000 < Date.now()) {
      const redirectUrl = request.nextUrl.clone()

      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED

      destroyCookie(null, '@edna:auth-token')

      return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}