import { prisma } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: { params: { slug: string } }) {
    try {
        const searchText = await prisma.products.findUnique({ where: { slug: ctx.params.slug }, select: { title: true } })
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
                    take: 1
                }
            },
            where: {
                title: {
                    search: searchText?.title?.split(" ").join(' | ')
                }
            },
        })
        return NextResponse.json({ relatedProducts: alsoAvailableIn })
    } catch (e) {
        console.log(e)
    }
}