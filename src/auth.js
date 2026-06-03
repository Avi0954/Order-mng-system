import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("[Auth Log] Email received in credentials provider:", credentials?.email);

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        const normalizedEmail = credentials.email.trim().toLowerCase();

        // Query User from Neon PostgreSQL via Prisma
        const user = await prisma.user.findUnique({
          where: { email: normalizedEmail },
        });

        if (!user) {
          console.log(`[Auth Log] No account found in database for email: ${normalizedEmail}`);
          throw new Error("No account found with this email.");
        }

        console.log(`[Auth Log] User account found in database: ID=${user.id}, Role=${user.role}`);

        // Compare hashed password
        const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);
        console.log(`[Auth Log] Password comparison result: ${isPasswordMatch ? "SUCCESS" : "FAIL"}`);

        if (!isPasswordMatch) {
          throw new Error("Incorrect password. Please try again.");
        }

        // Return user payload with role properties
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    // Inject the user's role and database ID into the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    // Pass JWT token properties (like role) into the client session object
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "inventoryms-secret-development-token-12345",
};
