import { prisma } from "@/config/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const userId = searchParams.get("userId")
    try {
        const cart = await prisma.cart.findUnique({
            select: {
                _count: {
                    select: {
                        items: true
                    }
                },
                items: {
                    select: {
                        quantity: true,
                        products: {
                            select: {
                                id: true,
                                title: true,
                                regularPrice: true,
                                salePrice: true,
                                images: {
                                    select: {
                                        id: true,
                                        src: true
                                    },
                                    take: 1
                                }
                            }
                        }
                    }
                }
            },
            where: {
                userId: userId?.toString()
            }
        })
        return NextResponse.json({ cart }, { status: 200 })
    } catch (e) {
        console.log(e)
        return NextResponse.json({}, { status: 400 })
    }
}