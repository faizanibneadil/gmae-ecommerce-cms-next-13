import type { CollectionConfig } from "payload";
import { Pages } from "../Pages";

export const Areas:CollectionConfig<'areas'> = {
    slug: 'areas',
    labels: { plural: 'Areas', singular: 'Area' },
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