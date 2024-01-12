import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "@/auth/actions/auth-actions";




const prisma = new PrismaClient()


export const authOptions:NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
      }),
        GithubProvider({
          clientId: process.env.GITHUB_ID ?? '',
          clientSecret: process.env.GITHUB_SECRET ?? '',
        }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email", placeholder: "user@email.com" },
          password: { label: "Contraseña", type: "password", placeholder: '*********' }
        },
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied
          const user = await signInEmailPassword(credentials!.email, credentials!.password)
    
          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return user
          } 

          return null
        }
      }),
      ],

    session: {
      strategy: 'jwt',
    },
    callbacks: {
      async signIn({user, account, profile, email, credentials}) {
        // console.log(user);
        return true
      },
      async jwt({token, user, account, profile}) {
        const dbUser = await prisma.user.findUnique({
          where: {email: token.email ?? 'no-email'}
        })
        if(dbUser?.isActive === false) {
          throw Error('usuario no está activo')
        }

        token.roles = dbUser?.roles ?? ['no-roles']
        token.id = dbUser?.id ?? 'no-uuid'
        
        return token
      },

      async session({session, token, user}) {

        if(session && session.user) {
          session.user.roles = token.roles
          session.user.id = token.id
        }

        return session
      }
    }
    
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}