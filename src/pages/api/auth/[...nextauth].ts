import dayjs from "dayjs";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { Client } from "@/utils/fetcher";

interface Credentials {
  email: string;
  password: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "Id" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        const { password, email } = credentials as Credentials;
        // @ts-ignore
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
        try {
          const { data: loginData } = await Client.post("/auth/login", {
            email: email,
            password,
          });

          const { data: user } = await Client.get("/user/me", {
            headers: {
              Authorization: loginData.accessToken,
            },
          });

          return {
            ...loginData,
            user: user,
          };
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        try {
          // @ts-ignore
          const userToken = token.data.accessToken;
          const { data: user } = await Client.get("/user/me", {
            headers: {
              Authorization: userToken,
            },
          });

          token.data = {
            // @ts-ignore
            ...token.data,
            user: user,
          };
        } catch (e) {
          console.log(e);
        }
      }

      if (user) {
        token.data = user;
      }
      // @ts-ignore
      return token;
    },
    async session({ session, token, user, newSession, trigger }) {
      // @ts-ignore
      session.user = token.data;
      // @ts-ignore
      session.expires = dayjs()
        // @ts-ignore
        .add(86400000)
        .toDate();
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
