import { NextAuthOptions } from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from '@/config/db'

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 3 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async session(props) {
            console.log("SESSION => ", props.session)
            return props.session
        },
    },
    pages: {
        signIn: process.env.BASE_URL,
        signOut: process.env.BASE_URL

        // error: "/authFailed",
        // newUser: "/newUser",
    }
}