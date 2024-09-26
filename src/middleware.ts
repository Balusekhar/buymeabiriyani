import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req:NextRequest) {
    const session = await auth();

    if(!session &&req.nextUrl.pathname === "/dashboard"){
        const homeUrl = new URL("/", req.url);
        return NextResponse.redirect(homeUrl);
    }
    return NextResponse.next();
}
