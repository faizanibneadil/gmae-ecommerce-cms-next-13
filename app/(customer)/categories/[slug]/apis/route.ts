import { prisma } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: { params: { slug: string } }) {
    try {
        const category = await prisma.categories.findUnique({
            select: {
                id: true,
                name: true,
                slug: true,
                images: {
                    select: {
                        id: true,
                        src: true
                    }
                },
                subCategory: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    }
                },
                Products: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        images: {
                            select: {
                                src: true
                            },
                            take: 1
                        }
                    }
                }
            },
            where: {
                slug: ctx.params.slug,
            }
        })
        return NextResponse.json({ category })
    } catch (e) {
        console.log(e)
    }
}