import { prisma } from "@/config/db";
import { cache } from "react";

export const getImageById = cache(async (id: string) => {
    if (id) {
        const image = await prisma.images.findUnique({ where: { id: id } })
        return image
    } else {
        return null
    }
})