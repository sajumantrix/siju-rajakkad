import { getBooksData } from "@/lib/sanityQueries";

export const revalidate = 60;

const BASE_URL = "https://sijurajakkad.com";

export default async function sitemap() {
  const books = await getBooksData();

  const staticRoutes = ["", "/books", "/gallery"].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "daily",
    priority: path === "" ? 1 : 0.8,
  }));

  const bookRoutes = books.map((book) => ({
    url: `${BASE_URL}/books/${book.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...bookRoutes];
}
