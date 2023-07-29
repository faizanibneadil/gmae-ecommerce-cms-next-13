import { prisma } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: { params: { id: string } }) {
    try {
        const [variants] = await prisma.products.findMany({
            select: {
                variants: {
                    select: {
                        id: true,
                        title: true,
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
                id: ctx.params.id
            }
        })
        return NextResponse.json({ productVariants: variants.variants })
    } catch (e) {
        console.log(e)
    }
}