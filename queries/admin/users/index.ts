'use server'

import { prisma } from "@/config/db"
import { unstable_cache } from "next/cache"

export async function _getUsers(distributionId: string) {
    const users = await unstable_cache(
        async () => {
            const data = await prisma.user.findMany({ where: { distributors: { some: { id: distributionId } } } });
            return data
        },
        ['users', distributionId],
        {
            tags: ['users', distributionId],
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
