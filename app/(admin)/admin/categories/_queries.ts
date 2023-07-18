import { cache } from "react";

export const getWidgetImagesAndCategoryById = cache(async (id: string | undefined) => {
    if (id) {
        const res = await fetch(`${process.env.BASE_URL}/admin/categories/apis/${id}`, { cache: "no-store" })
        return res.json()
    } else {
        return []
    }
})

type TCategories = {
    categories: {
        id: string;
        slug: string | null;
        name: string | null;
        order: number | null;
        images: {
            id: string;
            src: string | null;
        } | null;
        subCategory: {
            id: string;
            slug: string | null;
            name: string | null;
            order: number | null;
            images: {
                id: string;
                src: string | null;
            } | null;
        }[];
    }[]
}

export const getCategories = cache(async (): Promise<TCategories> => {
    const res = await fetch(`${process.env.BASE_URL}/admin/categories/apis`, { next: { tags: ['parent-categories'] } })
    return res.json()
})