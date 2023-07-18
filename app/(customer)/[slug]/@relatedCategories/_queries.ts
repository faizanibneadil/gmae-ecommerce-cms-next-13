import { cache } from "react";

export type RelatedCategoriesTypes = {
    relatedCategories: {
        images: {
            id: string;
            src: string | null;
        } | null;
        name: string | null;
        id: string;
        slug: string | null;
    }[]
}

export const getProductRelatedCategories = cache(async (slug: string): Promise<RelatedCategoriesTypes> => {
    if (slug) {
        const res = await fetch(`${process.env.BASE_URL}/${slug}/apis/get-product-related-categories`)
        return res.json()
    }
    else {
        return { relatedCategories: [] }
    }
})