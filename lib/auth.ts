import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {nanoid} from 'nanoid'
import "dotenv/config";
import { users } from "@/drizzle/schema/auth";
import { eq } from "drizzle-orm";
import { db } from "@/drizzle";

const NEXTAUTH_SECRET = process.env["NEXTAUTH_SECRET"];
const GOOGLE_CLIENT_ID = process.env["GOOGLE_CLIENT_ID"];
const GOOGLE_CLIENT_SECRET = process.env["GOOGLE_CLIENT_SECRET"];

if (!NEXTAUTH_SECRET)
  throw new Error("NEXTAUTH_SECRET is missing from env variables");
if (!GOOGLE_CLIENT_ID)
  throw new Error("GOOGLE_CLIENT_ID is missing from env variables");
if (!GOOGLE_CLIENT_SECRET)
  throw new Error("GOOGLE_CLIENT_SECRET is missing from env variables");

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  secret: NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages:{
    signIn:'/sign-in'
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.username =token.username;
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

      if(!dbUser.username){
        await db.update(users).set({username:nanoid(10)}).where(eq(users.id,dbUser.id))
      }

      return {
        id: dbUser.id,
        name: dbUser.name ,
        email: dbUser.email,
        picture: dbUser.image as string,
        username:dbUser.username,
        
      };
    },
    redirect(){
      return '/'
    }
  },
};

export const getAuthSession = () => getServerSession(authOptions);

