import { CollectionConfig } from "payload";
import { Pages } from "../Pages";

export const BillingItems: CollectionConfig<'billingItems'> = {
    slug: 'billingItems',
    labels: { plural: 'Billing Items', singular: 'Billing Item' },
    access: Pages.access,
    admin: {
        pagination: {
            defaultLimit: 100
        },
    },
    fields: [
        {
            name: 'billId',
            type: 'relationship',
            relationTo: 'billing',
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
                    Cell: '@/collections/BillingItems/Qty.tsx#Qty'
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