import NextAuth from "next-auth";
import { authOptions } from "@/auth";

// NextAuth initialization with our core configurations
const handler = NextAuth(authOptions);

// Exporting GET and POST handlers to catch authentication events (login, signout, session checks)
export { handler as GET, handler as POST };
