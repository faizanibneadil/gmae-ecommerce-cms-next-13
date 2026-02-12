import type { CollectionConfig } from "payload";

export const Transactions: CollectionConfig<'transactions'> = {
    slug: 'transactions',
    labels: { plural: 'Transactions', singular: 'Transaction' },
    admin: {
        useAsTitle: 'createdAt'
    },
    enableQueryPresets: true,
    fields: [
        {
            type: 'row',
            fields: [
                {
                    type: 'relationship',
                    relationTo: 'users',
                    filterOptions: () => ({ 'roles': { in: ['BOOKER'] } }),
                    name: 'bookedBy',
                    label: 'Booking By (Booker)',
                    required: true,
                    admin: {
                        width: '50%',
                        allowCreate: false,
                        allowEdit: false,
                        placeholder: 'Select a Booker'
                    }
                },
                {
                    type: 'relationship',
                    relationTo: 'users',
                    filterOptions: () => ({ 'roles': { in: ['SALES_MAN'] } }),
                    name: 'deliveredBy',
                    label: 'Deliver By (Sale Man)',
                    required: true,
                    admin: {
                        width: '50%',
                        allowCreate: false,
                        allowEdit: false,
                        placeholder: 'Select a Sale Man'
                    }
                }
            ]
        },
        {
            type: 'row',
            fields: [
                {
                    type: 'relationship',
                    relationTo: 'areas',
                    name: 'area',
                    label: 'Area',
                    required: true,
                    admin: {
                        width: '33.33%',
                        allowCreate: false,
                        allowEdit: false,
                        placeholder: 'Select a Area'
                    },
                },
                {
                    type: 'relationship',
                    relationTo: 'shops',
                    name: 'shop',
                    label: 'Shop',
                    required: true,
                    admin: {
                        width: '33.33%',
                        allowCreate: false,
                        allowEdit: false,
                        placeholder: 'Select a Shop'
                    },
                    filterOptions: ({ data }) => ({ 'area.id': { equals: data?.area } }),
                },
                {
                    type: 'relationship',
                    relationTo: 'companies',
                    name: 'company',
                    label: 'Company',
                    required: true,
                    admin: {
                        width: '33.33%',
                        allowCreate: false,
                        allowEdit: false,
                        placeholder: 'Select a Company'
                    }
                }
            ]
        },
        {
            type: 'array',
            name: 'products',
            labels: { plural: 'Products', singular: 'Product' },
            fields: []
        },
        {
            type: 'row',
            fields: [
                {
                    type: 'date',
                    name: 'deliverAt',
                    label: 'Deliver At (Delivery Date)',
                    required: true,
                    defaultValue: () => {
                        const now = new Date()
                        now.setDate(now.getDate() + 1)
                        return now
                    }
                },
                {
                    type: 'number',
                    name: 'extraDiscount',
                    label: 'Extra Discount',
                    defaultValue: 0
                }
            ]
        },
        {
            type: 'row',
            fields: [
                {
                    type: 'number',
                    name: 'profit',
                    label: 'Invoice Profit',
                    defaultValue: 0
                }
            ]
        }
    ]
}