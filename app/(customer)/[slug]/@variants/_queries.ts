import { cache } from "react";

export type ProductVariants = {
    productVariants: {
        images: {
            id: string;
            src: string | null;
        }[];
        id: string;
        title: string | null;
        slug: string | null;
    }[];
}

export const getProductVariants = cache(async (slug: string): Promise<ProductVariants> => {
    if (slug) {
        const res = await fetch(`${process.env.BASE_URL}/${slug}/apis/get-product-variants`, { cache: "no-store" })
        return res.json()
    } else {
        return { productVariants: [] }
    }
})