import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, fetchGuestWithRetry } from "./data-service";

const config: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },

    async signIn({ user }) {
      try {
        if (!user.email) throw new Error("No email found");
        if (!user.name) throw new Error("No name found");

        let existingGuest = null;
    
        try {
            existingGuest = await fetchGuestWithRetry(user.email);

        } catch (err) {
            console.warn("User not found, creating a new one...");
        }

        if (!existingGuest) {
           await createGuest({
           email: user.email,
           fullName: user.name,
         });
        }

    return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },

    async session({ session }) {
      try {
        if (!session?.user?.email) {
          throw new Error("No email found in session user object");
        }

        const userEmail = session.user.email.trim().toLowerCase();

        if (!session.user?.guestId) {
          const guest = await fetchGuestWithRetry(userEmail);

          if (!guest) {
            throw new Error(`Guest not found for email: ${userEmail}`);
          }

          session.user.guestId = guest.id;
        }

        return session;
      } catch (error) {
        if (error instanceof Error) {
          console.error("Session error details:", {
            error: error.message,
            stack: error.stack,
            sessionData: session,
          });
        } else {
          console.error("Unknown error type:", error);
        }
        throw error;
      }
    },
  },
};

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth(config);
