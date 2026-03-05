import type { CollectionConfig } from "payload";
import { Pages } from "../Pages";

export const Prices: CollectionConfig<'prices'> = {
    slug: 'prices',
    access: Pages.access,
    admin: {
        useAsTitle: 'currency',
        defaultColumns: ['currency','product','variant','price']
    },
    labels: {
        plural: 'Prices',
        singular: 'Price'
    },
    fields: [
        {
            type: 'relationship',
            relationTo: 'currencies',
            name: 'currency'
        },
        {
            type: 'relationship',
            relationTo: 'products',
            name: 'product'
        },
        {
            type: 'relationship',
            relationTo: 'variants',
            name: 'variant',
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
            type: 'number',
            name: 'price',
            defaultValue: 0
        }
    ]
}