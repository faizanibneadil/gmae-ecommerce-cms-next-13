import type { CollectionConfig } from 'payload'

export const Addresses: CollectionConfig = {
    slug: 'addresses',
    admin: {
        useAsTitle: 'label', // "Home", "Office", etc.
        defaultColumns: ['label', 'user', 'city', 'phone'],
    },
    fields: [
        {
            name: 'label',
            type: 'text',
            label: 'Address Label',
            admin: {
                placeholder: 'e.g. Home, Office, Warehouse',
            },
        },
        {
            name: 'user', // Prisma model ka User field
            type: 'relationship',
            relationTo: 'users',
            required: true,
            index: true,
            label: 'Account Owner',
        },
        {
            type: 'row', // Fields ko ek hi line mein dikhane ke liye
            fields: [
                {
                    name: 'streetAddress1',
                    type: 'text',
                    label: 'Street Address 1',
                    required: true,
                    admin: { width: '50%' },
                },
                {
                    name: 'streetAddress2',
                    type: 'text',
                    label: 'Street Address 2 (Optional)',
                    admin: { width: '50%' },
                },
            ],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'apartment',
                    type: 'text',
                    label: 'Apartment / Suite',
                    admin: { width: '33%' },
                },
                {
                    name: 'city',
                    type: 'text',
                    label: 'City',
                    admin: { width: '33%' },
                },
                {
                    name: 'province',
                    type: 'text',
                    label: 'Province / State',
                    admin: { width: '33%' },
                },
            ],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'postalCode',
                    type: 'number', // Prisma mein Int hai
                    label: 'Postal / ZIP Code',
                    admin: { width: '50%' },
                },
                {
                    name: 'phone',
                    type: 'text',
                    label: 'Contact Phone for this Address',
                    admin: { width: '50%' },
                },
            ],
        },
        // {
        //     name: 'orders',
        //     type: 'join',
        //     collection: 'orders',
        //     on: 'shippingAddress', // Orders collection mein jo field is address ko point karti hai
        //     label: 'Orders at this Address',
        //     admin: {
        //         description: 'List of all orders shipped to this specific address.',
        //     },
        // },
    ],
}