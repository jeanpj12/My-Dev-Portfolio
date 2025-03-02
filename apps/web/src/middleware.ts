import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const response = NextResponse.next();

    if(pathname.startsWith('/post')) {
        const [,, slug] = pathname.split('/')

        response.cookies.set('post', slug)
    } else {
        response.cookies.delete('post')
    }

    return response
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon/ico).*)'],
};
