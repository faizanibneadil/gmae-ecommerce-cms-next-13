import { cache } from "react";
import { CartItemsType } from "./_types";

export const getCartItems = cache(async (userId: string | undefined): Promise<CartItemsType> => {
    if (userId) {
        const res = await fetch(`${process.env.BASE_URL}/cart/apis?userId=${userId}`, { next: { tags: ['user-cart'] } })
        return res.json()
    } else {
        return { cart: { items: [], _count: { items: 0 } } }
    }
})