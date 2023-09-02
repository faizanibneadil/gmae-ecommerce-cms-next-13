'use server'

import { prisma } from "@/config/db"

export async function getCategories() {
    const categories = await prisma.categories.findMany({
        select: {
            id: true,
            name: true,
            slug: true,
            images: { select: { src: true } },
            subCategories: { select: { name: true, id: true, slug: true, images: { select: { src: true } } } }
        },
        where: {
            subCategories: { some: { id: {} } },
            Products: { some: { isFeatured: true, isPublished: true } },
            isPublished: true,
            displayOnLandingPage: true,
        },
        take: 8,
        orderBy: { order: "asc" },
    })
    return categories
}