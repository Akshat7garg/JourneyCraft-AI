import NextAuth from "next-auth";

// Extend the default `User` type in `next-auth`
declare module "next-auth" {
  interface User {
    id: string; // Add the id property
  }
  
  interface Session {
    user: User; // Ensure the session's user has the `id` property
  }
}
