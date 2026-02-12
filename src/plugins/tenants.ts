// import { isSuperAdmin } from "@/access/isSuperAdmin"
// import { getUserTenantIDs } from "@/utilities/getUserTenantIDs"
import { getUserTenantIDs } from "@/utilities/getUserTenantIDs"
import { multiTenantPlugin } from "@payloadcms/plugin-multi-tenant"
import type { Config } from "payload"


export const multiTenancy = multiTenantPlugin<Config>({
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
        billing: {},
        "order-status": {},
        addresses: {},
        favorites: {},
        users: {},
        "payment-methods": {},
        "shop-types": {},
        orders: {}
    },
    tenantField: {
        // hasMany: true,
        access: {
            read: () => true,
            update: ({ req }) => {
                // if (isSuperAdmin(req.user)) {
                //     return true
                // }
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