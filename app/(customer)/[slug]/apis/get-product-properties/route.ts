import { prisma } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: { params: { slug: string } }) {
    try {
        const properties = await prisma.products.findUnique({
            select: {
                id:true,
                title: true,
                description: true,
                regularPrice: true,
                salePrice: true,
            },
            where: {
                slug: ctx.params.slug
            }
        })
        return NextResponse.json({ properties })
    } catch (e) {
        console.log(e)
    }
}