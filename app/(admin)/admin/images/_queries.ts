import { cache } from "react";

export const getImages = cache(async () => {
    const res = await fetch(`${process.env.BASE_URL}/admin/images/apis`, { next: { tags: ['admin-all-images'] }, cache: "no-store" })
    return res.json()
}) 