import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { checkCreatorInDb } from "./db/prismaFunctions";

export async function middleware(req: NextRequest) {
  const session = await auth();
  const path = req.nextUrl.pathname;

  // Check if the path is for the dashboard
  if (path.endsWith('/dashboard')) {
    if (!session) {
      // Redirect to login if no session
      return NextResponse.redirect(new URL('/', req.url));
    }
    
    const usernamePath = path.split('/')[1]; // Extract username from path
    if (usernamePath !== session.user.username) {
      // Redirect if username in URL doesn't match session username
      return NextResponse.redirect(new URL(`/${session.user.username}/dashboard`, req.url));
    }

    // Check if user exists in DB
    const userExists = await checkCreatorInDb(session.user.email);
    if (!userExists) {
      // Redirect to welcome page if user doesn't exist in DB
      return NextResponse.redirect(new URL('/welcome', req.url));
    }

    // Allow access to dashboard
    return NextResponse.next();
  }

  // For the welcome page
  if (path === '/welcome') {
    if (!session) {
      // Redirect to login if no session
      return NextResponse.redirect(new URL('/', req.url));
    }

    const userExists = await checkCreatorInDb(session.user.email);
    if (userExists) {
      // Redirect to dashboard if user already exists
      return NextResponse.redirect(new URL(`/${session.user.username}/dashboard`, req.url));
    }

    // Allow access to welcome page
    return NextResponse.next();
  }

  // For all other routes, allow access
  return NextResponse.next();
}

export const config = {
  matcher: ['/welcome', '/:username/dashboard']
}