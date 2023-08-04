import { cache } from "react";

export type AlsoAvailableIn = {
    relatedProducts: {
        images: {
            id: string;
            src: string | null;
        }[];
        id: string;
        title: string | null;
        slug: string | null;
    }[]
}

export const getProductVariants = cache(async (slug: string): Promise<AlsoAvailableIn> => {
    if (slug) {
        const res = await fetch(`${process.env.BASE_URL}/${slug}/apis/get-related-products`)
        return res.json()
    }
    else {
        return { relatedProducts: [] }
    }
})