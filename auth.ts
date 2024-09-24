import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import connectDB from "./utils/db";
import { User } from "./models/User.model";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Email and password are required");
        }
        await connectDB();
        const user = await User.findOne({ email }).select("+password +role");

        if (!user) {
          throw new CredentialsSignin("User not found");
        }

        const isMatched = await compare(password, user.password);
        if (!isMatched) {
          throw new CredentialsSignin("Invalid password");
        }

        const userData = {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user._id,
        };
        return userData;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        //@ts-ignore
        session.user.role = token.role;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        //@ts-ignore
        token.role = user.role;
      }
      return token;
    },
    signIn: async ({ user, account }) => {
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          const { email, name, image, id } = user;
          await connectDB();
          const alreadyUser = await User.findOne({ email });

          if (!alreadyUser) {
            await User.create({
              name,
              email,
              image,
              authProviderId: id,
            });
            return true;
          } else {
            return true;
          }
        } catch (error) {
          throw new Error("Error while creating user");
        }
      }

      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
});
