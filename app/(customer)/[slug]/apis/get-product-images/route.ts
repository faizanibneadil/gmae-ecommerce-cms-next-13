import { prisma } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: { params: { slug: string } }) {
    try {
        const productImages = await prisma.products.findUnique({
            select: {
                images: {
                    select: {
                        id: true,
                        src: true
                    }
                }
            },
            where: {
                slug: ctx.params.slug
            }
        })
        return NextResponse.json({ images: productImages?.images })
    } catch (e) {
        console.log(`
            =======================
            ERROR: Something went wrong wen fetching product images
            =======================
        `)
        console.log(e)
    }
}