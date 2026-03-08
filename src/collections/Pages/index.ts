import { getUserTenantIDs } from "@/utilities/getUserTenantIDs";
import { CollectionConfig } from "payload";
import {
    MetaDescriptionField,
    MetaImageField,
    MetaTitleField,
    OverviewField,
    PreviewField,
} from '@payloadcms/plugin-seo/fields'

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
                    name: 'meta',
                    fields: [
                        MetaImageField({
                            // the upload collection slug
                            relationTo: 'media',

                            // if the `generateImage` function is configured
                            hasGenerateFn: true,
                        }),
                        MetaDescriptionField({
                            // if the `generateDescription` function is configured
                            hasGenerateFn: true,
                        }),
                        MetaTitleField({
                            // if the `generateTitle` function is configured
                            hasGenerateFn: true,
                        }),
                        PreviewField({
                            // if the `generateUrl` function is configured
                            hasGenerateFn: true,

                            // field paths to match the target field for data
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                        }),
                        OverviewField({
                            // field paths to match the target field for data
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                            imagePath: 'meta.image',
                        })
                    ]
                }
            ]
        }
    ]
}