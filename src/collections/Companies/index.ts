import type { CollectionConfig } from "payload";
import { Pages } from "../Pages";

export const Companies:CollectionConfig<'companies'> = {
    slug: 'companies',
    labels: { plural: 'Companies', singular: 'Company' },
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