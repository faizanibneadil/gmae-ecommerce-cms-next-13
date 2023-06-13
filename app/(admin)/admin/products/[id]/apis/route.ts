import { prisma } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: { params: { id: string } }) {
    console.log(ctx)
    try {
        const product = await prisma.products.findUnique({
            include: {
                Categories: {
                    select: {
                        id: true
                    }
                }
            },
            where: {
                id: ctx.params.id
            }
        })
        return NextResponse.json({ product })
    } catch (e) {
        console.log(e)
        return NextResponse.json({ msg: "not ok" })
    }
}