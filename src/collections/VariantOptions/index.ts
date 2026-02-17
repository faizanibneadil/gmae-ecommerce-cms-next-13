import type { CollectionConfig } from "payload";
import { Pages } from "../Pages";

export const VariantOptions: CollectionConfig<'variantOptions'> = {
    slug: 'variantOptions',
    labels: { plural: 'Variant Options', singular: 'Variant Option' },
    access: Pages.access,
    admin: {
        useAsTitle: 'label'
    },
    fields: [
        {
            name: 'variantType',
            type: 'relationship',
            admin: {
                readOnly: true,
            },
            relationTo: 'variantTypes',
            required: true,
        },
        {
            name: 'label',
            type: 'text',
            required: true,
        },
        {
            name: 'value',
            type: 'text',
            admin: {
                description: 'should be defaulted or dynamic based on label',
            },
            required: true,
        },
    ]
}