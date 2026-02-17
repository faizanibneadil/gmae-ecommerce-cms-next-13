import type { CollectionConfig } from "payload";
import { Pages } from "../Pages";

export const VariantTypes: CollectionConfig<'variantTypes'> = {
    slug: 'variantTypes',
    labels: { plural: 'Variant Types', singular: 'Variant Type' },
    access: Pages.access,
    admin: {
        useAsTitle: 'label'
    },
    fields: [
        {
            name: 'label',
            type: 'text',
            required: true,
        },
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'options',
            type: 'join',
            collection: 'variantOptions',
            maxDepth: 2,
            on: 'variantType',
            orderable: true,
        },
    ]
}