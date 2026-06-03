import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // No longer intercepting/checking admin routes
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
    "/dashboard/:path*",
    "/products/:path*",
    "/orders/:path*",
  ],
};
