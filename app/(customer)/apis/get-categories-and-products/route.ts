import { prisma } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const categoriesAndProducts = await prisma.categories.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                images: {
                    select: {
                        src: true
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
                    },
                    take: 6
                }
            },
            where: {
                Products: {
                    some: {
                        id: {}
                    }
                }
            },
            take: 8,
            orderBy: {
                order: "asc"
            }
        });
        return NextResponse.json({ categoriesAndProducts });
    } catch (e) {
        console.log(e)
    }
}