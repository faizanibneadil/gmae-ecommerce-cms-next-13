import type { CollectionConfig } from "payload";
import { Pages } from "../Pages";

export const Companies: CollectionConfig<'companies'> = {
    slug: 'companies',
    labels: { plural: 'Companies', singular: 'Company' },
    access: Pages.access,
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'createdAt'],
    },
    enableQueryPresets: true,
    fields: [
        {
            type: 'text',
            name: 'title',
            required: true,
            label: 'Company Name',
        },
        // {
        //     name: 'products',
        //     type: 'join',
        //     collection: 'products',
        //     on: 'company',
        //     label: 'Company Products',
        // },
        {
            name: 'bills',
            type: 'join',
            collection: 'billing',
            on: 'company',
            label: 'Invoices & Bills History',
            admin: {
                allowCreate: false,
                disableGroupBy: false,
                disableListColumn: false,
                disableListFilter: false,
                disableRowTypes: false,
            }
        },
    ],
}