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
      name: 'quoteEN',
      title: 'Quote (English)',
      type: 'text',
      description: 'English translation of the quote above, shown alongside it on the homepage.',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Include the country code without the plus sign (e.g., 919876543210). Readers will use this to order signed copies directly from you.',
    }),
    defineField({
      name: 'showQuote',
      title: 'Show Quote Section',
      type: 'boolean',
      description: 'Toggle off to hide the quote section on the homepage.',
      initialValue: true,
    }),
    defineField({
      name: 'showTestimonials',
      title: 'Show Reviews Section',
      type: 'boolean',
      description: 'Toggle off to hide the "What People Say" reviews section on the homepage.',
      initialValue: true,
    }),
    defineField({
      name: 'showAwards',
      title: 'Show Awards Section',
      type: 'boolean',
      description: 'Toggle off to hide the awards section on the homepage.',
      initialValue: true,
    }),
    defineField({
      name: 'showMedia',
      title: 'Show Media Coverage Section',
      type: 'boolean',
      description: 'Toggle off to hide the media coverage section on the homepage.',
      initialValue: true,
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook Profile URL',
      type: 'url',
      description: 'Full link to your Facebook profile or page.',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram Profile URL',
      type: 'url',
      description: 'Full link to your Instagram profile.',
    }),
    defineField({
      name: 'bioIntro',
      title: 'Bio Intro (Malayalam)',
      type: 'text',
      description: 'The main introductory paragraph shown in the "About the Author" section on the homepage.',
    }),
    defineField({
      name: 'bioSections',
      title: 'Bio Sections',
      type: 'array',
      description: 'Additional bio blocks shown below the intro paragraph, each with its own heading.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Section Title', type: 'string' }),
            defineField({ name: 'content', title: 'Section Content', type: 'text' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Reviews / Testimonials',
      type: 'array',
      description: 'Quotes from readers, critics, publishers, or fellow writers shown in the "What People Say" section.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'text', title: 'Quote', type: 'text' }),
            defineField({ name: 'author', title: 'Author Name', type: 'string' }),
            defineField({ name: 'role', title: 'Role / Title', type: 'string' }),
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Critic', value: 'critic' },
                  { title: 'Publisher', value: 'publisher' },
                  { title: 'Reader', value: 'reader' },
                  { title: 'Writer', value: 'writer' },
                ],
              },
            }),
          ],
          preview: {
            select: { title: 'author', subtitle: 'role' },
          },
        },
      ],
    }),
  ],
})
