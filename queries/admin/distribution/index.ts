'use server'

import { prisma } from "@/config/db"
import { endOfDay, startOfDay } from "@/lib/utils"
import { unstable_cache } from "next/cache"

export async function _getDistribution(userId: string) {
    const distribution = await unstable_cache(
        async () => {
            const data = await prisma.distributors.findMany({ where: { users: { some: { id: userId } } } })
            return data
        },
        ['distribution'],
        {
            tags: ['distribution'],
            revalidate: 10,
        }
    )()
    return distribution
}

export async function _getDistributionById(id: string) {
    const distribution = await unstable_cache(
        async () => {
            const data = await prisma.distributors.findMany({ where: { id } })
            return data
        },
        ['distribution', id],
        {
            tags: ['distribution', id],
            revalidate: 10,
        }
    )()
    return distribution
}

export async function _getDistributionInfo(distributionId: string) {
    const distribution = await unstable_cache(
        async () => {
            const data = await prisma.distributors.findMany({
                select: {
                    _count: {
                        select: {
                            areas: true,
                            bills: {
                                where: {
                                    createdAt: {
                                        gte: startOfDay(),
                                        lte: endOfDay(),
                                    },
                                },
                            },
                            companies: true,
                            products: true,
                            shops: true,
                            users: true,
                        },
                    },
                },
                where: {
                    id: distributionId,
                },
            })
            return data
        },
        ['distribution_info', distributionId],
        {
            tags: ['distribution_info', distributionId],
            revalidate: 10,
        }
    )()
    return distribution
}