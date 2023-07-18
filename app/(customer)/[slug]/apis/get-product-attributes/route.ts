import { prisma } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: { params: { slug: string } }) {
    try {
        const productAttributes = await prisma.products.findUnique({
            select: {
                Attributes: {
                    select: {
                        id: true,
                        name: true,
                        value: true
                    }
                }
            },
            where: {
                slug: ctx.params.slug
            }
        })
        return NextResponse.json({ attributes: productAttributes?.Attributes })
    } catch (e) {
        console.log(e)
    }
}