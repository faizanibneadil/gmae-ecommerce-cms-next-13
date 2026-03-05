import { CollectionConfig } from "payload";
import { Pages } from "../Pages";

export const Menus: CollectionConfig<'menus'> = {
    slug: 'menus',
    labels: { plural: 'Menus', singular: 'Menu' },
    access: Pages.access,
    admin: {
        useAsTitle: 'title'
    },
    fields: [
        {
            type: 'text',
            name: 'title',
            required: true
        },
        {
            type: 'array',
            name: 'links',
            labels: { plural: 'Links', singular: 'Link' },
            fields: [
                {
                    type: 'radio',
                    name: 'linkType',
                    defaultValue: 'internal',
                    options: [
                        {
                            label: 'Internal',
                            value: 'internal'
                        },
                        {
                            label: 'External',
                            value: 'external'
                        }
                    ]
                },
                {
                    type: 'row',
                    fields: [
                        {
                            type: 'text',
                            name: 'label'
                        },
                        {
                            type: 'relationship',
                            relationTo: 'pages',
                            name: 'page',
                            admin: {
                                width: '50%',
                                condition: (_, { linkType }) => linkType === 'internal'
                            }
                        },
                        {
                            type: 'text',
                            name: 'externalLink',
                            label: 'External Resource Link',
                            admin: {
                                width: '50%',
                                condition: (_, { linkType }) => linkType === 'external'
                            }
                        }
                    ]
                }
            ]
        }
    ]
}