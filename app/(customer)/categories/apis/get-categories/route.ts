import { prisma } from "@/config/db"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const categories = await prisma.categories.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                images: {
                    select: {
                        id: true,
                        src: true
                    }
                }
            }
        })
        return NextResponse.json({ categories })
    } catch (e) {
        console.log(e)
    }
}