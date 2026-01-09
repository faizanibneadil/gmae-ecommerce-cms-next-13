import { slugField, type CollectionConfig } from "payload";
import { Pages } from "../Pages";

export const Categories:CollectionConfig<'categories'>  = {
    slug: 'categories',
    labels: { plural: 'Categories', singular: 'Category' },
    access: Pages.access,
    admin: {
        useAsTitle: 'title'
    },
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
    ]
}