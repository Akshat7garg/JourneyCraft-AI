
import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from 'next-auth/providers/email'
import { JWT } from "next-auth/jwt";
import {Session} from "next-auth"

export const NEXT_AUTH_CONFIG={
   
    
    adapter: PrismaAdapter(prisma),
    providers:[
      EmailProvider({
        server:process.env.MAIL_SERVER,
        from: process.env.EMAIL_FROM

      })
        ,
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
    ],secret:process.env.NEXTAUTH_SECRET,

    callbacks: {
        async jwt({ token, account, user }:{token:JWT,account:any,user:any}) {
          // When the user logs in, save their access token and other info to the JWT token
          if (account && user) {
            token.accessToken = account.access_token;
            token.userId = user.id;  // Assuming user.id is being saved in the db
          }
          return token;
        },
        async session({ session, token }:{session:Session,token:JWT}) {
          // Add the token data (accessToken, userId) to the session object
          if (token) {
            
          }
          return session;
        },
      }
    
}