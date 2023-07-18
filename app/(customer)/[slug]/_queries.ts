import { cache } from "react";

type ProductProperties = {
    properties: {
        title: string | null;
        description: string | null;
        regularPrice: number | null;
        salePrice: number | null;
    } | null
}

export const getProductProperties = cache(async (slug: string): Promise<ProductProperties> => {
    if (slug) {
        const res = await fetch(`${process.env.BASE_URL}/${slug}/apis/get-product-properties`)
        return res.json()
    } else {
        return { properties: null }
    }
})