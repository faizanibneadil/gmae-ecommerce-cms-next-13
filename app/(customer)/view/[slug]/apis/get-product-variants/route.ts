import { prisma } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: { params: { slug: string } }) {
    try {
        const [variants] = await prisma.products.findMany({
            select: {
                variants: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        images: {
                            select: {
                                id: true,
                                src: true
                            }
                        }
                    }
                }
            },
            where: {
                slug: ctx.params.slug
            }
        })
        return NextResponse.json({ productVariants: variants.variants })
    } catch (e) {
        console.log(e)
    }
}