import { Plugin } from "payload";
import { isSuperAdmin } from "@/access/isSuperAdmin"
// import { getUserTenantIDs } from "@/utilities/getUserTenantIDs"
import { getUserTenantIDs } from "@/utilities/getUserTenantIDs"
import { multiTenantPlugin } from "@payloadcms/plugin-multi-tenant"
import type { Config } from "payload"
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs"
// import { formBuilderPlugin } from "@payloadcms/plugin-form-builder"
// import { redirectsPlugin } from "@payloadcms/plugin-redirects"
// import { searchPlugin } from "@payloadcms/plugin-search"
// import { seoPlugin } from "@payloadcms/plugin-seo"
// import { mcpPlugin } from "@payloadcms/plugin-mcp"

export const plugins: Plugin[] = [
    // seoPlugin({}),
    // redirectsPlugin({}),
    // searchPlugin({}),
    // formBuilderPlugin({}),
    // mcpPlugin({}),
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
                    if (isSuperAdmin(req.user)) {
                        return true
                    }
                    return getUserTenantIDs(req.user).length > 0
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