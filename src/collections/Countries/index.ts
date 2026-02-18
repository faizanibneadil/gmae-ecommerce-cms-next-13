import { CollectionConfig } from "payload";
import { Pages } from "../Pages";

export const Countries: CollectionConfig<'countries'> = {
    slug: 'countries',
    labels: { plural: 'Countries', singular: 'Country' },
    access: Pages.access,
    admin: {},
    fields: [
        {
            type: 'row',
            fields: [
                {
                    type: 'text',
                    name: 'label'
                },
                {
                    type: 'text',
                    name: 'value'
                }
            ]
        }
    ]
}