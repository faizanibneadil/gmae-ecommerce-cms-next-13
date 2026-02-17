import { type ArrayField, deepMerge } from "payload";
import { MinimumOneProducts } from "./validators";

export type ProductsFieldType = (overrides?: Partial<ArrayField>) => ArrayField
export const ProductsField: ProductsFieldType = (overrides = {}) => {
    const _field: ArrayField = {
        type: 'array',
        name: 'products',
        labels: { plural: 'Products', singular: 'Product' },
        // validate: MinimumOneProducts,
        admin: {
            components: {
                RowLabel: '@/collections/Billing/fields/ProductsField/components/VariantLabel.tsx#VariantLabel'
            },
            // condition: ({ company, billingProducts }) => {
            //     const hasCompany = Boolean(company)
            //     const hasManyBillingProducts = Array.isArray(billingProducts) && billingProducts.length > 0

            //     return hasCompany && hasManyBillingProducts
            // },
            isSortable: false,
            description: 'Before start select product you have to select Company based on company product will show.',
        },
        fields: [
            {
                type: 'row',
                fields: [
                    {
                        type: 'relationship',
                        relationTo: 'variants',
                        name: 'variant',
                        label: 'Product',
                        maxDepth: 2,
                        filterOptions: ({ data }) => {
                            const billingProductsIDs = data?.billingProducts

                            if (billingProductsIDs?.length) {
                                return {
                                    'product.id': {
                                        in: [...billingProductsIDs]
                                    }
                                }
                            }

                            return false
                        },
                        admin: {
                            allowCreate: false,
                            allowEdit: false,
                            isSortable: false,
                            // readOnly: true,
                            width:'100%',
                            placeholder: 'Select Product'
                        },
                        hasMany: false
                    },
                    {
                        type: 'number',
                        name: 'quantity',
                        label: 'Quantity',
                        defaultValue: 0,
                        admin: {
                            width: '50%'
                        }
                    },
                    {
                        type: 'number',
                        name: 'discount',
                        label: 'Discount',
                        defaultValue: 0,
                        admin: {
                            width: '50%'
                        }
                    },
                ]
            }
        ],
    }

    return deepMerge(_field, overrides)
} 