import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Role-based Access Control: Only ADMINs can access /admin or /api/admin route paths
    if ((path.startsWith("/admin") || path.startsWith("/api/admin")) && token?.role !== "ADMIN") {
      // Sellers are redirected back to operations dashboard
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      // Returns true if token exists, indicating the user is signed in
      authorized: ({ token }) => !!token,
    },
  }
);

// Protected routes matching pattern
export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
