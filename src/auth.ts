import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET || "development-secret-key-change-in-production",
  providers: [Discord],
  callbacks: {
    async jwt({ token, profile }) {
        if (profile) {
            token.id = profile.id;
        }
        
        return token;
    },

    async session({ session, token }) {
        session.user.id = token.id as string;

        return session;
    },
  }
})