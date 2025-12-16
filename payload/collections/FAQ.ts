import type { CollectionConfig } from 'payload'

export const FAQ: CollectionConfig = {
  slug: 'faq',
  labels: {
    singular: 'Pytanie FAQ',
    plural: 'FAQ',
  },
  admin: {
    useAsTitle: 'question',
    group: 'Treści',
    defaultColumns: ['question', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      label: 'Pytanie',
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
      name: 'answer',
      type: 'richText',
      label: 'Odpowiedź',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Kolejność',
      defaultValue: 0,
    },
  ],
}
