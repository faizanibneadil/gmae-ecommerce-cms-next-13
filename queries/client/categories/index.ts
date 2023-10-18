'use server'

import { prisma } from "@/config/db"
import { unstable_cache } from "next/cache"

export async function _getCategories() {
    const categories = await unstable_cache(
        async () => {
            const data = await prisma.categories.findMany()
            return data
        },
        ['categories'],
        {
            tags: ['categories', 'client-categories'],
            revalidate: 10,
        }
    )()
    return categories
}

export async function _getCategoryById(id: string) {
    const category_by_id = await unstable_cache(
        async () => {
            const data = await prisma.categories.findMany({ where: { id } })
            return data
        },
        ['category_by_id'],
        {
            tags: ['category_by_id', 'client-category_by_id'],
            revalidate: 10,
        }
    )()
    return category_by_id
}

export async function _getCategoryBySlug(slug: string) {
    const category_by_slug = await unstable_cache(
        async () => {
            const data = await prisma.categories.findMany({ where: { slug } })
            return data
        },
        ['category_by_slug'],
        {
            tags: ['category_by_slug', 'client-category_by_slug'],
            revalidate: 10,
        }
    )()
    return category_by_slug
}