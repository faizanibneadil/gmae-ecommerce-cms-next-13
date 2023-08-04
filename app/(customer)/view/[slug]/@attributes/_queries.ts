import { cache } from "react";

export type AttributesTypes = {
    attributes: {
        id: string;
        name: string;
        value: string;
    }[];
}

export const getProductAttributes = cache(async (slug: string): Promise<AttributesTypes> => {
    if (slug) {
        const res = await fetch(`${process.env.BASE_URL}/${slug}/apis/get-product-attributes`)
        return res.json()
    }
    else {
        return { attributes: [] }
    }
})