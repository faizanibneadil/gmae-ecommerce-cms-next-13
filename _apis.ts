import { User } from "@prisma/client";
import { cache } from "react";

export const getCategories = cache(async () => {
    const res = await fetch(`${process.env.BASE_URL}/admin/categories/apis`, { next: { tags: ["admin-all-categories"] } });
    return res.json();
});

export const getCategoryById = cache(async (id: string | null | undefined) => {
    if (id) {
        const res = await fetch(`${process.env.BASE_URL}/admin/categories/apis/${id}`, { cache: "no-store" })
        return res.json()
    } else {
        return {}
    }
})

export const getGetProductById = cache(async (id: string) => {
    const res = await fetch(`/admin/inventory/${id}/apis/${id}`, { next: { tags: ['initialized-product'] } })
    return res.json()
})

export const getUsers = cache(async ():Promise<{users: User[]}> => {
    const res = await fetch(`${process.env.BASE_URL}/admin/users/apis`, { next: { revalidate: 60 } })
    return res.json()
})