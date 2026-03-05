import { slugField, type CollectionConfig } from "payload";
import { Pages } from "../Pages";

export const Categories: CollectionConfig<'categories'> = {
    slug: 'categories',
    labels: { plural: 'Categories', singular: 'Category' },
    access: Pages.access,
    admin: {
        useAsTitle: 'title'
    },
    enableQueryPresets: true,
    fields: [
        {
            type: 'text',
            name: 'title',
            label: 'Title',
            required: true,
        },
        slugField({
            name: 'slug',
            useAsSlug: 'title'
        }),
        {
            type: 'row',
            fields: [
                {
                    type: 'checkbox',
                    name: 'isPublished',
                    label: 'Published',
                    required: true,
                    defaultValue: false,
                    admin: {
                        width: '50%',
                        position: 'sidebar'
                    }
                },
                {
                    type: 'checkbox',
                    name: 'displayOnLandingPage',
                    label: 'Display On Landing Page',
                    required: true,
                    defaultValue: false,
                    admin: { width: '50%' }
                }
            ]
        },
        {
            name: 'parentCategory',
            label: 'Parent Category',
            type: 'relationship',
            relationTo: 'categories',
            filterOptions: ({ id }) => ({ id: { not_equals: id } }),
            admin: {
                description: 'If this is a sub-category, select its parent. Otherwise, leave blank for top-level.',
            },
        },
        // {
        //     name: 'linkedProducts',
        //     label: 'Associated Products',
        //     type: 'join',
        //     collection: 'products',
        //     on: 'category',
        //     admin: {
        //         description: 'This is a list of all products currently linked to this category.',
        //         readOnly: true,
        //     },
        // },
    ]
}