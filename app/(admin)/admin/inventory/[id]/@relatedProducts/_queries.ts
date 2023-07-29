import { cache } from "react";

export type RelatedProductsTypes = {
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

export const getProductVariants = cache(async (id: string): Promise<RelatedProductsTypes> => {
    if (id) {
        const res = await fetch(`${process.env.BASE_URL}/admin/inventory/${id}/apis/get-related-products`, { cache: "no-store" })
        return res.json()
    }
    else {
        return { relatedProducts: [] }
    }
})