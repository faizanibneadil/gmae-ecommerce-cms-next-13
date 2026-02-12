import { type ArrayField, deepMerge } from "payload";
import { MinimumOneProducts } from "./validators";

export type ProductsFieldType = (overrides?: Partial<ArrayField>) => ArrayField
export const ProductsField: ProductsFieldType = (overrides = {}) => {
    const _field: ArrayField = {
        type: 'array',
        name: 'products',
        labels: { plural: 'Products', singular: 'Product' },
        validate: MinimumOneProducts,
        fields: [
            {
                type: 'text',
                name: 'productName'
            }
        ],
    }

    return deepMerge(_field, overrides)
} 