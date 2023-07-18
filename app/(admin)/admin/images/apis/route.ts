import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const images = await prisma.images.findMany()
        return NextResponse.json({ images })
    } catch (e) {
        console.log(e)
    }
}