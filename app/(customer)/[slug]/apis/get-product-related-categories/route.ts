import { prisma } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(erq: NextRequest, ctx: { params: { slug: string } }) {
    try {
        const productCategories = await prisma.products.findUnique({
            select: {
                Categories: {
                    select: {
                        name: true
                    }
                }
            },
            where: {
                slug: ctx.params.slug
            }
        })

        const searchText = productCategories?.Categories?.map(category => category.name?.split(" ").join(' | ')).join(' | ')
        const relatedCategories = await prisma.categories.findMany({
            select: {
                id: true,
                slug: true,
                name: true,
                images: {
                    select: {
                        id: true,
                        src: true
                    }
                }
            },
            where: {
                name: {
                    search: searchText
                },
            },
            take: 6
        })
        return NextResponse.json({ relatedCategories })
    } catch (e) {
        console.log(e)
    }
}