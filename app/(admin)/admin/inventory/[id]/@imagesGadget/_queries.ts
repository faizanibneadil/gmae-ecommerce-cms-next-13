import { cache } from "react";

export const getWidgetImages = cache(async (id: string) => {
    if (id) {
        const res = await fetch(`${process.env.BASE_URL}/admin/inventory/${id}/apis/get-gadget-images`, { next: { tags: ['widget-images']}, cache: "no-store" })
        return res.json()
    } else {
        return null
    }
})