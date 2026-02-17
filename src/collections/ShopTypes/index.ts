import type { CollectionConfig } from 'payload'

export const ShopTypes: CollectionConfig<'shopTypes'> = {
    slug: 'shopTypes',
    admin: {
        useAsTitle: 'name',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            unique: true,
            label: 'Shop Type Name',
            admin: {
                placeholder: 'e.g. Retailer, Wholesaler, Distributor',
            },
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Description',
        },
    ],
}