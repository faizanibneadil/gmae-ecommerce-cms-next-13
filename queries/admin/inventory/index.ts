'use server'
import "server-only"

import { prisma } from "@/config/db"
import { unstable_cache } from "next/cache"

export async function _getInventory(distributionId: string) {
    const inventory = await unstable_cache(
        async () => {
            const data = await prisma.products.findMany({
                select: {
                    id: true,
                    title: true,
                    isPublished: true,
                    isFeatured: true,
                    stock: true,
                    images: {
                        select: {
                            id: true,
                            src: true,
                        },
                    },
                },
                where: { distributors: { some: { id: distributionId } } },
                take: 24
            })
            return data
        },
        ['_getInventory'],
        {
            tags: ['_getInventory'],
            revalidate: 10,
        }
    )()
    return inventory
}

export async function _getInventoryById(inventoryId: string) {
    const inventory = await unstable_cache(
        async () => {
            const data = await prisma.products.findUnique({
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    description: true,
                    regularPrice: true,
                    salePrice: true,
                    purchasePrice: true,
                    purchaseLimit: true,
                    stock: true,
                    isFeatured: true,
                    isPublished: true,
                    isReviewEnable: true,
                    isTrackStock: true,
                },
                where: { id: inventoryId },
            })
            return data
        },
        ['inventory', inventoryId],
        {
            tags: ['inventory', inventoryId],
            revalidate: 10,
        }
    )()
    return inventory
}