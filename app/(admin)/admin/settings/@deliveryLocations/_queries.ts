import { cache } from "react";

export type LocationTypes = {
    locations: {
        id: string;
        location: string | null;
        rate: number | null;
    }[]
}

export const getLocation = cache(async (): Promise<LocationTypes> => {
    const res = await fetch(`${process.env.BASE_URL}/admin/settings/apis/get-location-by-id`, { next: { tags: ['locations']} })
    return res.json()
})