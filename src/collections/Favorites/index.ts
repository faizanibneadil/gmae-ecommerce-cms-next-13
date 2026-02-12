import type { CollectionConfig } from "payload";

export const Favorites: CollectionConfig<'favorites'> = {
    slug: 'favorites',
    labels: { plural: 'Favorites', singular: 'Favorite' },
    enableQueryPresets: true,
    fields: [
        {
            type: 'relationship',
            relationTo: 'users',
            name: 'user'
        }
    ]
}