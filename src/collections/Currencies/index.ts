import type { CollectionConfig } from "payload";
import { Pages } from "../Pages";

export const Currencies: CollectionConfig<'currencies'> = {
    slug: 'currencies',
    labels: { plural: 'Currencies', singular: 'Currency' },
    access: Pages.access,
    admin: {
        useAsTitle: 'label',
        defaultColumns: ['label', 'code', 'decimals', 'symbol'],
        // hidden:true
    },
    fields: [
        {
            type: 'row',
            fields: [
                {
                    type: 'text',
                    name: 'label',
                    label: 'Label',
                    admin: {
                        width: '50%'
                    }
                },
                {
                    type: 'text',
                    name: 'code',
                    label: 'Currency Code',
                    admin: {
                        width: '50%'
                    }
                },
            ]
        },
        {
            type: 'row',
            fields: [
                {
                    type: 'number',
                    name: 'decimals',
                    label: 'Decimals',
                    admin: {
                        width: '50%'
                    }
                },
                {
                    type: 'text',
                    name: 'symbol',
                    label: 'Symbol',
                    admin: {
                        width: '50%'
                    }
                }
            ]
        },
        {
            type: 'relationship',
            name: 'variant',
            relationTo: 'variants',
            hasMany:true,
            admin: {
                position: 'sidebar'
            }
        },
        {
            type: 'relationship',
            name: 'product',
            relationTo: 'products',
            hasMany: true,
            admin: {
                position: 'sidebar'
            }
        }
    ]
}