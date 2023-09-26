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
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    role: profile.role
                }
            }
        })
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async jwt({ token, user, account, profile, session }) {
            if (user) {
                // @ts-ignore
                token.role = user.role
            }
            // console.log("SESSION FROM JWT => ", session)
            // console.log("token FROM JWT => ", token)
            // console.log("user FROM JWT => ", user)
            // console.log("account FROM JWT => ", account)
            // console.log("profile FROM JWT => ", profile)
            return token
        },
        async session(props) {
            // console.log("SESSION => ", props)
            // @ts-ignore
            props.session.user.role = props.token.role
            props.session.user.id = props.token.sub
            // console.log(props.session)
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