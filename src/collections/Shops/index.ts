import type { CollectionConfig } from "payload";
import { Pages } from "../Pages";

export const Shops: CollectionConfig<'shops'> = {
    slug: 'shops',
    labels: { plural: 'Shops', singular: 'Shop' },
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
        {
            type: 'row',
            fields: [
                {
                    type: 'relationship',
                    relationTo: 'users',
                    name: 'owner',
                    label: 'Owner',
                    required: true,
                    admin: { width: '50%' }
                },
                {
                    type: 'relationship',
                    relationTo: 'areas',
                    name: 'area',
                    label: 'Area',
                    admin: { width: '50%' }
                },
            ]
        },
        {
            type: 'row',
            fields: [
                {
                    type: 'relationship',
                    relationTo: 'shopTypes',
                    name: 'shopType',
                    label: 'Shop Type',
                    admin: { width: '50%' }
                },
                {
                    type: 'relationship',
                    relationTo: 'paymentMethods',
                    name: 'paidBy',
                    label: 'Payment Methods',
                    admin: { width: '50%' }
                },
            ]
        },
        {
            type: 'row',
            fields: [
                {
                    type: 'number',
                    name: 'phone',
                    label: 'Phone',
                    admin: { width: '50%' }
                },
                {
                    type: 'text',
                    name: 'address',
                    label: 'Address',
                    admin: { width: '50%' }
                }
            ]
        },
        {
            name: 'bills',
            type: 'join',
            collection: 'invoices',
            on: 'shop',
            label: 'Shop Invoices History',
            admin: {
                allowCreate: false,
                disableGroupBy: false,
                disableListColumn: false,
                disableListFilter: false,
                disableRowTypes: false,
                description: 'Overview of all invoices and bills generated for this shop.',
            }
        },
    ]
}