import type { CollectionConfig } from "payload";
import { Pages } from "../Pages";

export const Areas: CollectionConfig<'areas'> = {
    slug: 'areas',
    labels: { plural: 'Areas', singular: 'Area' },
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
            name: 'shops',
            type: 'join',
            collection: 'shops',
            label: 'Area Shops',
            on: 'area',
            admin: {
                allowCreate: false,
                disableGroupBy: false,
                disableListColumn: false,
                disableListFilter: false,
                disableRowTypes: false,
                defaultColumns: ['title', 'owner', 'shopType', 'paidBy'],
                description: 'Overview of all shops.',
            }
        },
        {
            name: 'bills',
            type: 'join',
            collection: 'invoices',
            on: 'shop',
            label: 'Area Invoices History',
            admin: {
                allowCreate: false,
                disableGroupBy: false,
                disableListColumn: false,
                disableListFilter: false,
                disableRowTypes: false,
                description: 'Overview of all invoices and bills generated for this shop.',
            }
        }
    ]
}