import { defineField, defineType } from 'sanity'

export const bookType = defineType({
  name: 'book',
  title: 'Book',
  type: 'document',
  fields: [
    defineField({
      name: 'titleML',
      title: 'Title (Malayalam)',
      type: 'string',
      description: 'The Malayalam title of the book (e.g. പിതൃത്വ സർട്ടിഫിക്കറ്റ്)',
    }),
    defineField({
      name: 'titleEN',
      title: 'Title (English)',
      type: 'string',
      description: 'The English translation of the title, used mostly for SEO and URLs.',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'How much the book costs (e.g. ₹180 or $10). Leave blank if not for sale.',
    }),
    defineField({
      name: 'year',
      title: 'Publication Year',
      type: 'string',
      description: 'The year the book was first published (e.g. 2023).',
    }),
    defineField({
      name: 'stories',
      title: 'Format / Stories',
      type: 'string',
      description: 'What kind of book is this? (e.g. Novel, 15 Short Stories, Anthology).',
    }),
    defineField({
      name: 'publisher',
      title: 'Publisher',
      type: 'string',
      description: 'The name of the publishing house (e.g. DC Books).',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      initialValue: 'Malayalam',
      description: 'The primary language the book is written in.',
    }),
    defineField({
      name: 'cover',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Upload a high-quality image of the book cover. You can crop it after uploading!',
    }),
    defineField({
      name: 'images',
      title: 'Additional Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: {
        layout: 'grid',
      },
      description: 'Extra photos of the book (back cover, sample pages, etc.) shown alongside the cover on its detail page. Click an uploaded image to preview, crop, or remove it; drag to reorder.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A catchy summary of the book to convince visitors to buy it.',
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
      description: 'Check this if the book is currently available for purchase.',
    }),
  ],
})
