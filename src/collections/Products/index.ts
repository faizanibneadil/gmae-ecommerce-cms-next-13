import type { CollectionConfig, DefaultDocumentIDType, Where } from "payload";
import { Pages } from "../Pages";
import {
    FixedToolbarFeature,
    HeadingFeature,
    HorizontalRuleFeature,
    InlineToolbarFeature,
    lexicalEditor
} from '@payloadcms/richtext-lexical'

export const Products: CollectionConfig<'products'> = {
    slug: 'products',
    labels: { plural: 'Products', singular: 'Product' },
    access: Pages.access,
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title','variants','prices','inventory']
    },
    enableQueryPresets:true,
    fields: [
        { name: 'title', type: 'text', required: true },
        {
            type: 'tabs',
            tabs: [
                {
                    fields: [
                        {
                            name: 'description',
                            type: 'richText',
                            editor: lexicalEditor({
                                features: ({ rootFeatures }) => {
                                    return [
                                        ...rootFeatures,
                                        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                                        FixedToolbarFeature(),
                                        InlineToolbarFeature(),
                                        HorizontalRuleFeature(),
                                    ]
                                },
                            }),
                            label: false,
                            required: false,
                        },
                        {
                            name: 'gallery',
                            type: 'array',
                            minRows: 1,
                            fields: [
                                {
                                    name: 'image',
                                    type: 'upload',
                                    relationTo: 'media',
                                    required: true,
                                },
                                {
                                    name: 'variantOption',
                                    type: 'relationship',
                                    relationTo: 'variantOptions',
                                    admin: {
                                        condition: (data) => {
                                            return data?.enableVariants === true && data?.variantTypes?.length > 0
                                        },
                                    },
                                    filterOptions: ({ data }) => {
                                        if (data?.enableVariants && data?.variantTypes?.length) {
                                            const variantTypeIDs = data?.variantTypes?.map((item: any) => {
                                                if (typeof item === 'object' && item?.id) {
                                                    return item.id
                                                }
                                                return item
                                            }) as DefaultDocumentIDType[]

                                            if (variantTypeIDs.length === 0)
                                                return {
                                                    variantType: {
                                                        in: [],
                                                    },
                                                }

                                            const query: Where = {
                                                variantType: {
                                                    in: variantTypeIDs || [],
                                                },
                                            }

                                            return query
                                        }

                                        return {
                                            variantType: {
                                                in: [],
                                            },
                                        }
                                    },
                                },
                            ],
                        },

                        // {
                        //     name: 'layout',
                        //     type: 'blocks',
                        //     blocks: [],
                        // },
                    ],
                    label: 'Content',
                },
                {
                    fields: [
                        {
                            name: 'enableVariants',
                            type: 'checkbox',
                            defaultValue: false
                        },
                        {
                            name: 'variantTypes',
                            type: 'relationship',
                            admin: {
                                condition: ({ enableVariants }) => Boolean(enableVariants),
                            },
                            hasMany: true,
                            relationTo: 'variantTypes',
                        },
                        {
                            name: 'variants',
                            type: 'join',
                            admin: {
                                condition: ({ enableVariants, variantTypes }) => {
                                    const enabledVariants = Boolean(enableVariants)
                                    const hasManyVariantTypes = Array.isArray(variantTypes) && variantTypes.length > 0

                                    return enabledVariants && hasManyVariantTypes
                                },
                                defaultColumns: ['title', 'options', 'inventory', 'prices', '_status'],
                                disableListColumn: true,
                            },
                            collection: 'variants',
                            maxDepth: 2,
                            on: 'product',
                        },
                        {
                            type: 'join',
                            collection: 'prices',
                            on: 'product',
                            name: 'prices'
                        },
                        // PricesField(),
                        {
                            name: 'inventory',
                            type: 'number',
                            defaultValue: 0,
                            min: 0,
                            admin: {
                                condition: ({ enableVariants }) => !!enableVariants,
                            },
                        },
                        {
                            name: 'relatedProducts',
                            type: 'relationship',
                            filterOptions: ({ id }) => {
                                if (id) {
                                    return {
                                        id: {
                                            not_in: [id],
                                        },
                                    }
                                }

                                // ID comes back as undefined during seeding so we need to handle that case
                                return {
                                    id: {
                                        exists: true,
                                    },
                                }
                            },
                            hasMany: true,
                            relationTo: 'products',
                            admin: { appearance: 'drawer' }
                        },
                    ],
                    label: 'Product Details',
                },
                {
                    fields: [
                        {
                            type: 'join',
                            collection: 'invoices',
                            name: 'invoices',
                            on: 'billingProducts'
                        }
                    ],
                    label: 'Invoices'
                }
            ],
        },
        {
            name: 'categories',
            type: 'relationship',
            admin: {
                position: 'sidebar',
                sortOptions: 'title',
            },
            hasMany: true,
            relationTo: 'categories',
        },
        {
            name: 'company',
            type: 'relationship',
            admin: {
                position: 'sidebar',
                sortOptions: 'title',
            },
            relationTo: 'companies',
        },
        {
            name: 'brand',
            type: 'relationship',
            admin: {
                position: 'sidebar',
                sortOptions: 'title',
            },
            relationTo: 'brands',
        },
    ]
}