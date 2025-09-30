import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("TOKEN FROM MIDDLEWARE:", token); 

  if (token) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: ["/cart/:path*", "/wishList/:path*"], 
};
