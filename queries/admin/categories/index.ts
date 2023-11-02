'use server'
import "server-only"

import { authOptions } from "@/config/authOptions";
import { prisma } from "@/config/db"
import { getServerSession } from "next-auth";
import { unstable_cache } from "next/cache"

export const _getCategoriesOfProduct = async ({
    productId
}: {
    productId: string
}) => {
    const session = await getServerSession(authOptions)

    if (!session) throw Error("Unauthorized")
    if (!productId) throw Error("Product Id is required.")

    const categories = await unstable_cache(
        async () => {
            const data = await prisma.categories.findMany({
                select: {
                    id: true,
                    name: true,
                    isPublished: true,
                    displayOnLandingPage: true,
                    images: {
                        select: { src: true },
                    },
                    subCategories: { select: { name: true }, where: { id: productId } },
                    Products: { select: { id: true }, where: { id: productId } },
                },
            });
            return data
        },
        ['_getCategoriesOfProduct'],
        {
            tags: ['_getCategoriesOfProduct'],
            revalidate: 60 * 30,
        }
    )()
    return categories
}
