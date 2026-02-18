import type { CollectionConfig } from "payload";
import { Pages } from "../Pages";
import { validateOptions } from "./hooks/validateOptions";
import { variantsCollectionBeforeChange } from "./hooks/beforeChange";
import { PricesField } from "@/fields/Prices";

export const Variants: CollectionConfig<'variants'> = {
    slug: 'variants',
    labels: { plural: 'Variants', singular: 'Variant' },
    access: Pages.access,
    admin: {
        useAsTitle: 'title',
        description: 'Variant Collection Description.',
        // hidden:true
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            admin: {
                description:
                    'Used for administrative purposes, not shown to customers. This is populated by default.',
            },
        },
        {
            name: 'product',
            type: 'relationship',
            admin: {
                position: 'sidebar',
                readOnly: true,
            },
            relationTo: 'products',
            required: true,
        },
        {
            // This might need to be a custom component, to show a selector for each variant that is
            // enabled on the parent product
            // - separate select inputs, each showing only a specific variant (w/ options)
            // - it will save data to the DB as IDs in this relationship field
            // and needs a validate function as well which enforces that the options are fully specified, and accurate
            name: 'options',
            type: 'relationship',
            admin: {
                components: {
                    Field: {
                        path: '@/collections/Variants/components/VariantOptionsSelector/index.tsx#VariantOptionsSelector',
                    },
                },
            },
            custom: {
                productsSlug: 'products',
                variantTypesSlug: 'variantTypes',
            },
            hasMany: true,
            label: 'Variant options',
            relationTo: 'variantOptions',
            required: true,
            validate: validateOptions,
        },
        {
            type: 'join',
            collection: 'prices',
            on: 'variant',
            name: 'prices'
        },
        // PricesField(),
        {
            name: 'inventory',
            type: 'number',
            defaultValue: 0,
            min: 0,
        }
    ],
    hooks: {
        beforeChange: [variantsCollectionBeforeChange]
    }
}