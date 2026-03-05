import { CollectionConfig } from "payload";
import { Pages } from "../Pages";

export const InvoiceItems: CollectionConfig<'invoiceItems'> = {
    slug: 'invoiceItems',
    labels: { plural: 'Invoice Items', singular: 'Invoice Item' },
    access: Pages.access,
    admin: {
        pagination: {
            defaultLimit: 100
        },
        // hidden: true,
    },
    fields: [
        {
            name: 'billId',
            type: 'relationship',
            relationTo: 'invoices',
            index: true,
        },
        {
            name: 'product',
            type: 'relationship',
            relationTo: 'products',
        },
        {
            name: 'variant',
            type: 'relationship',
            relationTo: 'variants',
            admin: {
                condition: ({ product }) => Boolean(product)
            },
            filterOptions: ({ data }) => {
                const productID = data?.product

                if (productID) {
                    return {
                        product: {
                            equals: productID
                        }
                    }
                }

                return false
            }
        },
        {
            name: 'quantity',
            type: 'number',
            defaultValue: 0,
            admin: {
                components: {
                    Cell: '@/collections/InvoiceItems/Qty.tsx#Qty'
                }
            }
        },
        {
            name: 'discount',
            type: 'number',
            defaultValue: 0,
        }
    ]
}