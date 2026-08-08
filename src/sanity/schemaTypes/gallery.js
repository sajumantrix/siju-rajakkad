import { defineField, defineType } from 'sanity'

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Upload the photo to display in the gallery.',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'A short caption describing this photo (e.g. Book launch of ...).',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Book Launch', value: 'Book Launch' },
          { title: 'Literary Festivals', value: 'Literary Festivals' },
          { title: 'Speaking Events', value: 'Speaking Events' },
          { title: 'Newspaper Features', value: 'Newspaper Features' },
        ],
      },
      description: 'Used to group and filter photos in the gallery tabs.',
    }),
  ],
})
