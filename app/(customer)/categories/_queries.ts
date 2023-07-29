import { cache } from "react";
import { CategoriesTypes } from "./_types";

export const getCategories = cache(async (): Promise<CategoriesTypes> => {
    const res = await fetch(`${process.env.BASE_URL}/categories/apis/get-categories`, { next: { revalidate: 60 } })
    return await res.json()
})