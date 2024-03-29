'use server'

import { prisma } from "@/config/db";

export async function getInventory({ lastProductId }: { lastProductId: string }) {
    const res = await prisma.products.findMany({
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
        cursor: {
            id: lastProductId
        },
        take: 12,
        skip: 1
    });
    return res;
}