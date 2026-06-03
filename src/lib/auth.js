import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

/**
 * Retrieves the current user session on the server side (Server Components, Route Handlers).
 */
export async function getSession() {
  return await getServerSession(authOptions);
}

/**
 * Gets the current user object from the active session.
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user || null;
}

/**
 * Validates if the currently logged-in user possesses the required authorization role.
 */
export async function checkRole(requiredRole) {
  const user = await getCurrentUser();
  if (!user) return false;
  return user.role === requiredRole;
}
