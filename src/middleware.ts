import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { readSiteDomain } from "./lib/db/site-domain";

interface SiteDomainResponse {
  companySlug: string;
}

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  const hostname = req.headers.get("host");
  console.log("Hostname: ", hostname);

  let currentHost;
  if (process.env.NODE_ENV === "production") {
    const baseDomain = process.env.NEXT_URL;
    currentHost = hostname?.replace(`.${baseDomain}`, "");
  } else {
    currentHost = hostname?.replace("localhost:3000", "");
  }

  if (!currentHost) {
    console.log("No subdomain found, serving root domain");
    return NextResponse.next();
  }

  console.log("Current subdomain: ", currentHost);

  const response = await readSiteDomain(currentHost);

  if ("error" in response) {
    console.error("Error fetching site domain:", response.error);
    return NextResponse.next();
  }

  if (Array.isArray(response) && response.length > 0) {
    const siteDomain: SiteDomainResponse = response[0];
    const tenantSubdomain = siteDomain.companySlug;
    console.log("Tenant subdomain: ", tenantSubdomain);

    if (tenantSubdomain) {
      return NextResponse.rewrite(new URL(`/${tenantSubdomain}`, req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
