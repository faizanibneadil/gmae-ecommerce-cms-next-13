import { prisma } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const images = await prisma.images.findMany({ where: { Products: { some: { id: ctx.params.id } } } })
        return NextResponse.json({ images })
    } catch (e) {
        console.log(e)
    }
}