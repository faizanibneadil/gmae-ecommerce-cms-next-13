'use server'

import { prisma } from "@/config/db";

export async function getImages({ lastImagId }: { lastImagId: string }) {
    const res = await prisma.images.findMany({
        cursor: {
            id: lastImagId
        },
        take: 12,
        skip: 1
    });
    return res;
}