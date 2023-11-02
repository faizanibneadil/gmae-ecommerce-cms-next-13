'use server'
import "server-only"

import { prisma } from "@/config/db"
import { unstable_cache } from "next/cache"

export async function _getAreas(distributionId: string) {
    const areas = await unstable_cache(
        async () => {
            const data = prisma.areas.findMany({ select: { _count: { select: { shops: true } }, id: true, name: true }, where: { distributors: { some: { id: distributionId } } } });
            return data
        },
        ['_getAreas'],
        {
            tags: ['_getAreas'],
            revalidate: 10,
        }
    )()
    return areas
}

export async function _getAreaById(areaId: string) {
    const area = await unstable_cache(
        async () => {
            const data = await prisma.areas.findUnique({ where: { id: areaId } });
            return data
        },
        ['area', areaId],
        {
            tags: ['area', areaId],
            revalidate: 10,
        }
    )()
    return area
}
