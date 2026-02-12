import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  trash: true,
  admin: { 
    // group: NavigationGroups.portfolio 
  },
  enableQueryPresets: true,
  upload: {
    formatOptions:{
      format: 'webp',
    },
    mimeTypes: ['image/*'],
  },
  access: {
    create: () => true,
    delete: () => true,
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}