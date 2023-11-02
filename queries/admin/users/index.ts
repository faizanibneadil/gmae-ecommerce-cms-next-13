'use server'
import "server-only"

import { prisma } from "@/config/db"
import { unstable_cache } from "next/cache"

export async function _getUsers(distributionId: string) {
    const users = await unstable_cache(
        async () => {
            const data = await prisma.user.findMany({ where: { distributors: { some: { id: distributionId } } }, orderBy: { createdAt: "desc" } });
            return data
        },
        ["_getUsers"],
        {
            tags: ["_getUsers"],
            revalidate: 10,
        }
    )()
    return users
}

export async function _getUserById(userId: string) {
    const area = await unstable_cache(
        async () => {
            const data = await prisma.user.findUnique({ where: { id: userId } });
            return data
        },
        ['area', userId],
        {
            tags: ['area', userId],
            revalidate: 10,
        }
    )()
    return area
}
