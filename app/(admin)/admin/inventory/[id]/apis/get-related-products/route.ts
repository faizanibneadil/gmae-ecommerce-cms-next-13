import { prisma } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const searchText = await prisma.products.findUnique({ where: { id: ctx.params.id }, select: { title: true } })
        const alsoAvailableIn = await prisma.products.findMany({
            select: {
                id: true,
                title: true,
                slug: true,
                images: {
                    select: {
                        id: true,
                        src: true
                    },
                }
            },
            where: {
                title: {
                    search: searchText?.title?.split(" ").join(' | '),
                },
            },
        })
        return NextResponse.json({ relatedProducts: alsoAvailableIn })
    } catch (e) {
        console.log(e)
    }
}