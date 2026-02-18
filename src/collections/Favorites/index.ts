import type { CollectionConfig } from "payload";

export const Favorites: CollectionConfig<'favorites'> = {
    slug: 'favorites',
    labels: { plural: 'Favorites', singular: 'Favorite' },
    enableQueryPresets: true,
    admin: {
        // hidden:true
    },
    fields: [
        {
            type: 'relationship',
            relationTo: 'users',
            name: 'user'
        }
    ]
}