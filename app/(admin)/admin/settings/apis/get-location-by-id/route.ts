import { prisma } from "@/config/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try {
        const locations = await prisma.deliveryLocations.findMany()
        return NextResponse.json({ locations })
    } catch (e) {
        console.log(e)
    }
}