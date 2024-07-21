import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/site", "/api/uploadthing"],
  async afterAuth(auth, req) {
    //rewrite for domains
    const url = req.nextUrl;

    if (
      url.pathname === "/" ||
      (url.pathname === "/site" && url.host === process.env.NEXT_URL)
    ) {
      return NextResponse.rewrite(new URL("/site", req.url));
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
