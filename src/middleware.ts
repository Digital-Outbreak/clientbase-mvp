import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { readSiteDomain } from "./lib/db/site-domain";

interface SiteDomainResponse {
  companySlug: string;
}

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/(api|trpc)(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;
  const searchParams = url.searchParams.toString();

  const hostname = req.headers.get("host");

  const pathWithSearchParams = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  let currentHost: string | undefined;
  if (process.env.NODE_ENV === "production") {
    const baseDomain = process.env.NEXT_URL;
    currentHost = hostname?.replace(`.${baseDomain}`, "");
  } else {
    currentHost = hostname?.replace(".localhost:3000", "");
  }

  // Base URL should not be protected
  if (!currentHost || currentHost === "localhost") {
    console.log("No subdomain found or base URL, serving root domain");
    return NextResponse.next();
  }

  // Protect routes that are not the base URL
  if (isProtectedRoute(req)) {
    auth().protect();
  }

  // Fetch and handle site domain
  const response = await readSiteDomain(currentHost);

  if ("error" in response) {
    console.error("Error fetching site domain:", response.error);
    return NextResponse.error();
  }

  if (Array.isArray(response) && response.length > 0) {
    const siteDomain: SiteDomainResponse = response[0];
    const tenantSubdomain = siteDomain.companySlug;

    if (tenantSubdomain) {
      return NextResponse.rewrite(
        new URL(`/${tenantSubdomain}${pathWithSearchParams}`, req.url)
      );
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
