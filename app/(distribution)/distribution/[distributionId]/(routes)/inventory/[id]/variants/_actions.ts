'use server'

import { prisma } from "@/config/db"

export async function $getVariants(id: string) {
    const variants = await prisma.products.findMany({ where: { variantBy: { some: { id } } }, select: { id: true, title: true, images: { select: { src: true }, take: 1 } } })
    return variants
}

export async function $searchVariants(formData: FormData) {
    const query = formData.get("query") as string
    const search = query.split(' ').join(" | ")
    const variants = await prisma.products.findMany({ where: { title: { search } }, select: { id: true, title: true, images: { select: { src: true }, take: 1 } } })
    return variants
}