import type { CollectionConfig } from 'payload'

export const Zajecia: CollectionConfig = {
  slug: 'zajecia',
  labels: {
    singular: 'Zajęcia',
    plural: 'Zajęcia',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Treści',
    defaultColumns: ['title', 'showOnHome', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Nazwa zajęć',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug (URL)',
      required: true,
      unique: true,
      admin: {
        description: 'np. pole-dance, aerial-hoop',
      },
    },
    {
      name: 'shortDesc',
      type: 'textarea',
      label: 'Krótki opis (1-2 zdania)',
    },
    {
      name: 'fullDesc',
      type: 'textarea',
      label: 'Pełny opis',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Zdjęcie zajęć',
    },
    {
      name: 'imageOrientation',
      type: 'select',
      label: 'Orientacja zdjęcia',
      options: [
        { label: 'Poziome (landscape)', value: 'horizontal' },
        { label: 'Pionowe (portrait)', value: 'vertical' },
      ],
      defaultValue: 'horizontal',
    },
    {
      name: 'maxPeople',
      type: 'text',
      label: 'Max osób',
      admin: {
        description: 'np. max. 8 osób',
      },
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Czas trwania',
      defaultValue: '60 min',
    },
    {
      name: 'requirements',
      type: 'textarea',
      label: 'Wymagania',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Lista korzyści',
      fields: [
        {
          name: 'feature',
          type: 'text',
          label: 'Korzyść/cecha',
        },
      ],
    },
    {
      name: 'showOnHome',
      type: 'checkbox',
      label: 'Pokaż na stronie głównej',
      defaultValue: true,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Kolejność',
      defaultValue: 0,
    },
  ],
}
