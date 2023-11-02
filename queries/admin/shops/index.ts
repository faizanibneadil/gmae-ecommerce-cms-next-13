'use server'
import "server-only"

import { prisma } from "@/config/db"
import { unstable_cache } from "next/cache"

export async function _getShops(distributionId: string) {
    const shops = await unstable_cache(
        async () => {
            const data = prisma.shops.findMany({
                where: { distributors: { some: { id: distributionId } } },
            });
            return data
        },
        ["_getShops"],
        {
            tags: ["_getShops"],
            revalidate: 10,
        }
    )()
    return shops
}

export async function _getShopById(shopId: string) {
    const shop = await unstable_cache(
        async () => {
            const data = prisma.shops.findUnique({ include: { Areas: true }, where: { id: shopId } });
            return data
        },
        ['shop', shopId],
        {
            tags: ['shop', shopId],
            revalidate: 10,
        }
    )()
    return shop
}
