import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      user: User;
      accessToken: string;
      refreshToken: string;
    };
  }
}

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  provider: Provider;
  role: Role;
}

export type Provider = "EMAIL" | "GOOGLE" | "FACEBOOK" | "KAKAO";
export type Role = "USER" | "ADMIN";
