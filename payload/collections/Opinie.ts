import type { CollectionConfig } from 'payload'

export const Opinie: CollectionConfig = {
  slug: 'opinie',
  labels: {
    singular: 'Opinia',
    plural: 'Opinie',
  },
  admin: {
    useAsTitle: 'author',
    group: 'Treści',
    defaultColumns: ['author', 'rating', 'source', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'author',
      type: 'text',
      label: 'Imię autora',
      required: true,
      admin: {
        description: 'np. Anna K.',
      },
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Treść opinii',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Ocena (1-5)',
      min: 1,
      max: 5,
      defaultValue: 5,
    },
    {
      name: 'source',
      type: 'text',
      label: 'Źródło',
      defaultValue: 'Google',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Kolejność',
      defaultValue: 0,
    },
  ],
}
