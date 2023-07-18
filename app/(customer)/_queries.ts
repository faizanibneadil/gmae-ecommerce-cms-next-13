import { cache } from "react"

export type CategoriesAndProductTypes = {
    categoriesAndProducts: {
        id: string;
        images: {
            src: string | null;
        } | null;
        Products: {
            id: string;
            title: string | null;
            slug: string | null;
            images: {
                src: string | null;
            }[];
        }[];
        name: string | null;
        slug: string | null;
    }[]
}

export const getCategoriesAndProductsQuery = cache(async (): Promise<CategoriesAndProductTypes> => {
    const res = await fetch(`${process.env.BASE_URL}/apis/get-categories-and-products`, { next: { revalidate: 60 } })
    return res.json()
})