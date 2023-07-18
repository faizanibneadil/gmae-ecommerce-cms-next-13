import { prisma } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const product = await prisma.products.findUnique({
            select: {
                title: true,
                images: {
                    select: {
                        id: true
                    }
                }
            },
            where: { id: ctx.params.id },
        })
        if (product) {
            const gadgetImages = await prisma.images.findMany({
                where: {
                    searchText: {
                        hasSome: product?.title?.toLowerCase()?.split(" ") ?? ['placeholder']
                    }
                }
            })
            return NextResponse.json({ gadgetImages, limitReached: product?.images?.length === 5 })
        } else {
            return NextResponse.json({ productNotFound: true })
        }
    } catch (e) {
        console.log(e)
    }
}