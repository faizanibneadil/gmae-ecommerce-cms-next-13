import { cache } from "react";
import { CategoriesAndProductsTypes } from "./types";

export const getCategoryAndProductsBySlug = cache(async ({ slug }: { slug: string }): Promise<CategoriesAndProductsTypes> => {
    if (slug) {
        const res = await fetch(`${process.env.BASE_URL}/categories/${slug}/apis`, { cache: "no-store" })
        return res.json()
    } else {
        return { category: null }
    }
})