import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"


export default withAuth((req) => {
    if (req?.nextauth?.token?.role === "ADMIN") {
        console.log("USER ADMIN HE")
    }
}, {
    callbacks: {
        authorized: token => !!token
    }
})