import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/api/webhooks(.*)",
]);

const isAdminRoute = createRouteMatcher(["/dashboard/admin(.*)"]);
const isSellerRoute = createRouteMatcher(["/dashboard/seller(.*)"]);
const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const userRole = (sessionClaims?.metadata as { role?: string })?.role;

  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Redirect to sign-in if not authenticated
  if (!userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Handle dashboard routes based on user role
  if (isDashboardRoute(req)) {
    // ADMIN role - only access /dashboard/admin
    if (isAdminRoute(req)) {
      if (userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    }

    // SELLER role - only access /dashboard/seller
    if (isSellerRoute(req)) {
      if (userRole !== "SELLER") {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    }

    // USER role - redirect to home page
    if (userRole === "USER") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // No valid role - redirect to home
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
