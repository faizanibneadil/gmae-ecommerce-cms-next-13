import { prisma } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const categories = await prisma.categories.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
                order: true,
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
                        order: true,
                        images: {
                            select: {
                                id: true,
                                src: true
                            }
                        },
                    },
                    orderBy: {
                        order: "asc"
                    }
                }
            },
            orderBy: {
                order: "asc"
            },
            where: {
                parentCategory: null,
            },
        });
        return NextResponse.json({ categories })
    } catch (e) {
        console.log(e)
        return NextResponse.json({ error: "Something went wrong when fetching categories 👎" })
    }
}