import { cache } from "react";

export type ProductVariants = {
    productVariants: {
        images: {
            id: string;
            src: string | null;
        }[];
        id: string;
        title: string | null;
    }[];
}

export const getProductVariants = cache(async (id: string): Promise<ProductVariants> => {
    if (id) {
        const res = await fetch(`${process.env.BASE_URL}/admin/inventory/${id}/apis/get-product-variants`, { next: { tags: ['admin-product-variants'] } })
        return res.json()
    } else {
        return { productVariants: [] }
    }
})