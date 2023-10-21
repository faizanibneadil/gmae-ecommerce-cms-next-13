'use server'

import { prisma } from "@/config/db"
import { unstable_cache } from "next/cache"

export async function _getImages() {
    const images = await unstable_cache(
        async () => {
            const data = await prisma.images.findMany({ take: 24 });
            return data
        },
        ['images'],
        {
            tags: ['images'],
            revalidate: 10,
        }
    )()
    return images
}

export async function _getImageById(ImageId: string) {
    const image = await unstable_cache(
        async () => {
            const data = await prisma.images.findUnique({ where: { id: ImageId } });
            return data
        },
        ['image'],
        {
            tags: ['image'],
            revalidate: 10,
        }
    )()
    return image
}
