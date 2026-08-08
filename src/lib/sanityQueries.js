import { client } from '@/sanity/client'
import { urlForImage } from '@/sanity/image'

// Fallback data in case Sanity is completely empty during initial setup
import { defaultData } from './data'

export async function getAuthorData() {
  try {
    const author = await client.fetch(`*[_type == "author"][0]`)
    if (author) {
      return { ...defaultData.author, ...author }
    }
    return defaultData.author
  } catch (error) {
    console.error("Error fetching author:", error)
    return defaultData.author
  }
}

export async function getBooksData() {
  try {
    const books = await client.fetch(`*[_type == "book"] | order(year desc)`)
    if (books && books.length > 0) {
      return books.map(b => ({ ...b, id: b._id }))
    }
    return [] // Strict CMS reflection: return empty array if no books exist
  } catch (error) {
    console.error("Error fetching books:", error)
    return []
  }
}

export async function getBookById(id) {
  try {
    const book = await client.fetch(`*[_type == "book" && _id == $id][0]`, { id })
    if (book) return { ...book, id: book._id }
    return null // Strict CMS reflection: return null if book doesn't exist
  } catch (error) {
    console.error("Error fetching book:", error)
    return null
  }
}

export async function getGalleryData() {
  try {
    const gallery = await client.fetch(
      `*[_type == "gallery"] | order(_createdAt asc){ ..., "dims": image.asset->metadata.dimensions }`
    )
    if (gallery && gallery.length > 0) {
      return gallery
        .map(g => ({
          id: g._id,
          caption: g.caption,
          category: g.category,
          src: g.image ? urlForImage(g.image)?.url() : null,
          width: g.dims?.width,
          height: g.dims?.height,
        }))
        .filter(g => g.src)
    }
    return defaultData.gallery || []
  } catch (error) {
    console.error("Error fetching gallery:", error)
    return defaultData.gallery || []
  }
}
