import type { CollectionConfig } from "payload";
import { Pages } from "../Pages";

export const Brands: CollectionConfig<'brands'> = {
    slug: 'brands',
    labels: { plural: 'Brands', singular: 'Brand' },
    access: Pages.access,
    admin: {
        useAsTitle: 'title'
    },
    enableQueryPresets: true,
    fields: [
        {
            type: 'text',
            name: 'title',
            required: true,
            label: 'Title'
        },
        // {
        //     name: 'products',
        //     type: 'join',
        //     collection: 'products',
        //     on: 'brand',
        //     label: 'Linked Products',
        //     admin: {
                // allowCreate: false,
                // disableGroupBy: false,
                // disableListColumn: false,
                // disableListFilter: false,
                // disableRowTypes: false,
        //         description: 'List of all products belonging to this brand.',
        //     }
        // },
    ]
}