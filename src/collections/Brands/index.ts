import type { CollectionConfig } from "payload";
import { Pages } from "../Pages";

export const Brands:CollectionConfig<'brands'> = {
    slug: 'brands',
    labels: { plural: 'Brands', singular: 'Brand' },
    access: Pages.access,
    admin: {
        useAsTitle: 'title'
    },
    fields: [
        {
            type: 'text',
            name: 'title',
            required: true,
            label: 'Title'
        }
    ]
}