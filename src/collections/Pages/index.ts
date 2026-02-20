import { getUserTenantIDs } from "@/utilities/getUserTenantIDs";
import { CollectionConfig } from "payload";

export const Pages: CollectionConfig<'pages'> = {
    slug: 'pages',
    access: {
        create: ({ req }) => ({
            tenant: {
                in: getUserTenantIDs(req.user, 'tenant-admin'),
            },
        }),
        update: ({ req }) => ({
            tenant: {
                in: getUserTenantIDs(req.user, 'tenant-admin'),
            },
        }),
        read: ({ req }) => ({
            tenant: {
                in: getUserTenantIDs(req.user, 'tenant-admin'),
            },
        }),
        delete: ({ req }) => ({
            tenant: {
                in: getUserTenantIDs(req.user, 'tenant-admin'),
            },
        }),
    },
    admin: {
        useAsTitle: 'title'
    },
    enableQueryPresets: true,
    fields: [
        {
            type: 'text',
            label: 'Title',
            name: 'title',
            required: true
        },
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: []
                },
                {
                    label: 'SEO',
                    fields: []
                }
            ]
        }
    ]
}