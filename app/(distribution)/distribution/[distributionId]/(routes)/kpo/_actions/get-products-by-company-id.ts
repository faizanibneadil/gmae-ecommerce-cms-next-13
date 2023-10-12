'use server'

import { prisma } from "@/config/db"

export async function getProductsByCompanyId(id: string) {
    try {
        const products = await prisma.products.findMany({
            select: {
                id: true,
                title: true,
                regularPrice: true,
                salePrice: true,
                stock: true,
                profit: true,
            },
            where: { Companies: { id } }
        })
        return products
    } catch (error) {
        console.log("Something Went Wrong when fetching products by areaId. 👎")
        console.log(error)
    }
}