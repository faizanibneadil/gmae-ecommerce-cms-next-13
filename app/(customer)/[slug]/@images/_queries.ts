import { cache } from "react";

export type Images = {
    images: {
        id: string;
        src: string | null;
    }[] | undefined
}

export const getProductImages = cache(async (slug: string): Promise<Images> => {
    if (slug) {
        const res = await fetch(`${process.env.BASE_URL}/${slug}/apis/get-product-images`)
        return res.json()
    }
    else {
        return { images: [] }
    }
})