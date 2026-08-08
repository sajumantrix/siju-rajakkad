import { defineField, defineType } from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name (English)',
      type: 'string',
      description: 'Your name exactly as it should appear at the top of the website.',
    }),
    defineField({
      name: 'nameML',
      title: 'Name (Malayalam)',
      type: 'string',
      description: 'Your name in Malayalam script.',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'A short catchy sentence about who you are (e.g. "Malayalam Author & Storyteller").',
    }),
    defineField({
      name: 'quote',
      title: 'Quote (Malayalam)',
      type: 'text',
      description: 'Your favorite quote or philosophy that will appear on the homepage.',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Include the country code without the plus sign (e.g., 919876543210). Readers will use this to order signed copies directly from you.',
    }),
  ],
})
