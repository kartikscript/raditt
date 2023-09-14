import { NextAuthOptions, getServerSession } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import "dotenv/config";
import { users } from "@/drizzle/schema/auth";
import { eq } from "drizzle-orm";
import { db } from "@/drizzle";

const NEXTAUTH_SECRET = process.env["NEXTAUTH_SECRET"];
const DISCORD_CLIENT_ID = process.env["DISCORD_CLIENT_ID"];
const DISCORD_CLIENT_SECRET = process.env["DISCORD_CLIENT_SECRET"];

if (!NEXTAUTH_SECRET)
  throw new Error("NEXTAUTH_SECRET is missing from env variables");
if (!DISCORD_CLIENT_ID)
  throw new Error("DISCORD_CLIENT_ID is missing from env variables");
if (!DISCORD_CLIENT_SECRET)
  throw new Error("DISCORD_CLIENT_SECRET is missing from env variables");

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  secret: NEXTAUTH_SECRET,
  providers: [
    DiscordProvider({
      clientId: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.picture as string;
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      const email = token.email;

      const dbUser = (
        await db
          .select()
          .from(users)
          .where(eq(users.email, email as string))
      )[0];

      if (!dbUser) {
        if (user) {
          token.id = user.id;
        }
        return token;
      }
      return {
        id: dbUser.id,
        name: dbUser.name || "",
        email: dbUser.email,
        picture: dbUser.image as string,
      };
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
