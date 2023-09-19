'use server'

import { prisma } from "@/config/db"

export async function getShopsByAreaId(id: string) {
    try {
        const shops = await prisma.shops.findMany({
            select: { id: true, name: true },
            where: { Areas: { id } }
        })
        return shops
    } catch (error) {
        console.log("Something Went Wrong when fetching shops by areaId. 👎")
        console.log(error)
    }
}