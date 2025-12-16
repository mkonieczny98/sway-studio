import type { CollectionConfig } from 'payload'

export const Karnety: CollectionConfig = {
  slug: 'karnety',
  labels: {
    singular: 'Karnet',
    plural: 'Karnety',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Treści',
    defaultColumns: ['name', 'price', 'isPopular', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nazwa karnetu',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
    },
    {
      name: 'entries',
      type: 'text',
      label: 'Liczba wejść',
      defaultValue: '8x',
      admin: {
        description: 'np. 8x',
      },
    },
    {
      name: 'price',
      type: 'text',
      label: 'Cena',
      defaultValue: '310 zł',
    },
    {
      name: 'period',
      type: 'text',
      label: 'Okres',
      defaultValue: 'miesięcznie',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Co zawiera',
      fields: [
        {
          name: 'feature',
          type: 'text',
          label: 'Cecha',
        },
      ],
    },
    {
      name: 'isPopular',
      type: 'checkbox',
      label: '⭐ Najpopularniejszy',
      defaultValue: false,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Kolejność',
      defaultValue: 0,
    },
  ],
}
