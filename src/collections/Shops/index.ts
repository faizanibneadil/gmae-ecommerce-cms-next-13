import type { CollectionConfig } from "payload";
import { Pages } from "../Pages";

export const Shops: CollectionConfig<'shops'> = {
    slug: 'shops',
    labels: { plural: 'Shops', singular: 'Shop' },
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
                    type: 'select',
                    name: 'popType',
                    label: 'Pop Type',
                    options: [
                        { label: 'Retailer', value: 'RETAILER' },
                        { label: 'Wholeseler', value: 'WHOLESELER' }
                    ],
                    admin: { width: '50%' }
                },
                {
                    type: 'select',
                    name: 'payType',
                    label: 'Pay Type',
                    options: [
                        { label: 'Cash', value: 'CASH' },
                        { label: 'Cheque', value: 'CHEQUE' },
                        { label: 'Bill', value: 'BILL' }
                    ],
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
                    admin: { width: '50%'}
                },
                {
                    type: 'text',
                    name: 'address',
                    label: 'Address',
                    admin: { width: '50%' }
                }
            ]
        },
    ]
}