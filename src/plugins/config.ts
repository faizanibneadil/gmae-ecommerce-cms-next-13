import { Plugin } from "payload";
import { isSuperAdmin } from "@/access/isSuperAdmin"
// import { getUserTenantIDs } from "@/utilities/getUserTenantIDs"
import { getUserTenantIDs } from "@/utilities/getUserTenantIDs"
import { multiTenantPlugin } from "@payloadcms/plugin-multi-tenant"
import type { Config } from "payload"
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs"
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder"
import { redirectsPlugin } from "@payloadcms/plugin-redirects"
import { searchPlugin } from "@payloadcms/plugin-search"
import { seoPlugin } from "@payloadcms/plugin-seo"
import { getServerSideURL } from "@/utilities/getURL";
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { mcpPlugin } from "@payloadcms/plugin-mcp"

export const plugins: Plugin[] = [
    seoPlugin({
        uploadsCollection: 'media',
        generateTitle: ({doc}) => doc?.title ?? 'Unknown Title',
        generateDescription: ({doc}) => doc?.description ?? 'Unknown Description',
        generateImage: ({doc}) => doc?.image,
        generateURL: () => getServerSideURL()
    }),
    redirectsPlugin({
        collections: ['pages'],
        redirectTypes: ['301','302','303','307','308']
    }),
    searchPlugin({
        collections: ['products','variants','pages','categories']
    }),
    formBuilderPlugin({
        formOverrides: {
            fields: ({ defaultFields }) => {
                // console.log({ defaultFields })
                return defaultFields.map((field) => {
                    if ('name' in field && field.name === 'confirmationMessage') {
                        return {
                            ...field,
                            editor: lexicalEditor({
                                features: ({ rootFeatures }) => {
                                    return [
                                        ...rootFeatures,
                                        FixedToolbarFeature(),
                                        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] })
                                    ]
                                }
                            })
                        }
                    }
                    return field
                })
            }
        },
        fields: {
            payment: false
        },
        redirectRelationships: ['pages']
    }),
    mcpPlugin({
        collections: {
            products: {
                enabled: true
            }
        },
        overrideApiKeyCollection: (collection) => {
            return {
                ...collection,
                admin: {
                    group: undefined
                }
            }
        }
    }),
    nestedDocsPlugin({
        collections: ['categories'],
        // generateLabel: (_, doc) => `/${doc?.title}`
    }),
    multiTenantPlugin<Config>({
        // debug: true,
        enabled: true,
        collections: {
            media: {},
            pages: {},
            categories: {},
            companies: {},
            areas: {},
            brands: {},
            shops: {},
            invoices: {},
            orderStatus: {},
            addresses: {},
            favorites: {},
            users: {},
            paymentMethods: {},
            shopTypes: {},
            orders: {},
            products: {},
            transactions: {},
            currencies: {},
            variantOptions: {},
            variantTypes: {},
            variants: {},
            invoiceItems: {},
            prices: {},
            countries: {},
            menus: {}
        },
        tenantField: {
            // hasMany: true,
            access: {
                read: () => true,
                update: ({ req }) => {
                    if (isSuperAdmin(req.user as any)) {
                        return true
                    }
                    return getUserTenantIDs(req.user as any).length > 0
                    // return true
                },
            },
        },
        tenantsArrayField: {
            includeDefaultField: false,
        },
        userHasAccessToAllTenants: (user) => true,
    })
]