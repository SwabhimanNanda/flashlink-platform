// import { NextResponse } from 'next/server';
// import { getSession } from 'next-auth/react';

// export async function middleware(request) {  
//   const path = request.nextUrl.pathname;

//   // Public paths that don't require authentication
//   const publicPaths = ['/'];
//   const isPublicPath = publicPaths.some((pp) => path.startsWith(pp));

//   const session = await getSession({ request });
  
//   console.log(session);
  
//   if (!session && path.startsWith('/dashboard')) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   // If user is not logged in and the path is not public, redirect to home
//   if (!session && !isPublicPath) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/dashboard/:path*',
//     '/api/:path*',
//     '/:username',
//   ],
// };