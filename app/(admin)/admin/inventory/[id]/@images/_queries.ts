import { cache } from "react";

export const getProductImagesById = cache(async (id: string) => {
    if (id) {
        const res = await fetch(`${process.env.BASE_URL}/admin/inventory/${id}/apis/get-product-images`, { next: { tags: ['product-form-images'] } })
        return res.json()
    } else {
        return []
    }
})