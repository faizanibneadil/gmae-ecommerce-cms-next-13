import { prisma } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: { params: { [key: string]: string } }) {
    try {
        const category = await prisma.categories.findUnique({
            select: {
                id: true,
                name: true,
                slug: true,
                order: true,
                parentCategory:{
                    select:{
                        id: true,
                    }
                },
                images: {
                    select: {
                        id: true,
                        src: true
                    }
                },
            },
            where: {
                id: ctx.params.id
            }
        })

        const widgetImages = await prisma.images.findMany({
            where: {
                searchText: {
                    hasSome: category?.name?.toLowerCase()?.split(" ") ?? ['placeholder']
                }
            },
            select: {
                id: true,
                src: true,
                altText: true
            }
        })
        return NextResponse.json({ widgetImages, category })
    } catch (e) {
        console.log(e)
        return NextResponse.json({ msg: "error" })
    }
}