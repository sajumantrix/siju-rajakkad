import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookById, getAuthorData, getBooksData } from "@/lib/sanityQueries";
import { buildWhatsAppURL, buildWhatsAppEnquiryURL } from "@/lib/whatsapp";
import { urlForImage } from "@/sanity/image";
import { IconWhatsapp, IconChevronRight } from "@/components/Icons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookImageGallery from "@/components/BookImageGallery";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) {
    return { title: "Book Not Found" };
  }

  const title = book.titleEN ? `${book.titleML} (${book.titleEN})` : book.titleML;
  const rawDescription =
    book.description || `${book.titleML} by Siju Rajakkad${book.publisher ? `, published by ${book.publisher}` : ""}.`;
  const flatDescription = rawDescription.replace(/\s+/g, " ").trim();
  const description =
    flatDescription.length > 160 ? `${flatDescription.slice(0, 157).trim()}...` : flatDescription;
  const coverUrl = typeof book.cover === "string" ? book.cover : (book.cover ? urlForImage(book.cover)?.url() : null);

  return {
    title,
    description,
    alternates: { canonical: `/books/${id}` },
    openGraph: {
      title,
      description,
      url: `/books/${id}`,
      images: coverUrl ? [{ url: coverUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: coverUrl ? [coverUrl] : undefined,
    },
  };
}

export default async function BookDetailPage({ params }) {
  const { id } = await params;

  const book = await getBookById(id);
  const author = await getAuthorData();
  const allBooks = await getBooksData();

  if (!book) {
    notFound();
  }

  const outOfStock = book.inStock === false;
  const waURL = buildWhatsAppURL(author.whatsappNumber, book.titleML);
  const enquiryURL = buildWhatsAppEnquiryURL(author.whatsappNumber, book.titleML);
  const coverUrl = typeof book.cover === "string" ? book.cover : (book.cover ? urlForImage(book.cover)?.url() : "/images/placeholder.svg");
  const extraImageUrls = (book.images || [])
    .filter((img) => img?.asset)
    .map((img) => urlForImage(img)?.url())
    .filter(Boolean);
  const galleryImages = [coverUrl, ...extraImageUrls];

  const metaRows = [
    { label: "Publisher", value: book.publisher },
    { label: "Published", value: book.year },
    { label: "Language", value: book.language },
    { label: "Format", value: book.stories },
  ].filter((m) => m.value);

  const moreBooks = allBooks.filter((b) => b.id !== book.id).slice(0, 6);

  const bookJsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.titleEN ? `${book.titleML} (${book.titleEN})` : book.titleML,
    author: { "@type": "Person", name: "Siju Rajakkad" },
    inLanguage: book.language || "Malayalam",
    ...(book.publisher && { publisher: { "@type": "Organization", name: book.publisher } }),
    ...(book.year && { datePublished: String(book.year) }),
    ...(book.description && { description: book.description }),
    ...(coverUrl && { image: coverUrl }),
    ...(book.price && (() => {
      const numericPrice = book.price.replace(/[^0-9.]/g, "");
      return numericPrice
        ? {
            offers: {
              "@type": "Offer",
              price: numericPrice,
              priceCurrency: "INR",
              availability: outOfStock
                ? "https://schema.org/OutOfStock"
                : "https://schema.org/InStock",
            },
          }
        : {};
    })()),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar showAwards={author.showAwards !== false} />
      <main className="book-gr-wrap pt-[80px] md:pt-[108px]">
        <div className="container">
          <nav className="book-gr-crumb">
            <Link href="/">Home</Link>
            <IconChevronRight size={12} />
            <Link href="/books">Books</Link>
            <IconChevronRight size={12} />
            <span>{book.titleEN || book.titleML}</span>
          </nav>

          <div className="book-gr-card">
            <BookImageGallery
              images={galleryImages}
              alt={book.titleEN || book.titleML || "Book cover"}
              stockLabel={outOfStock ? "Sold Out" : "In Stock"}
              outOfStock={outOfStock}
            />

            <div className="book-gr-info">
              <h1 className="book-gr-title">{book.titleML}</h1>
              {book.titleEN && <p className="book-gr-title-en">{book.titleEN}</p>}

              <div className="book-gr-author-row">
                <div className="book-gr-author-name">{author.name}</div>
                <div className="book-gr-author-sub">{author.tagline}</div>
                <div className="book-gr-price-block">
                  <div className="book-gr-price-label">Price</div>
                  <div className="book-gr-price">{book.price ? `Rs. ${book.price}` : "Contact for price"}</div>
                </div>
              </div>

              <div className="book-gr-actions">
                {outOfStock ? (
                  <a href={enquiryURL} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
                    <IconWhatsapp size={16} />
                    Enquire on WhatsApp
                  </a>
                ) : (
                  <a href={waURL} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
                    <IconWhatsapp size={16} />
                    Buy on WhatsApp
                  </a>
                )}
              </div>

              {book.description && <p className="book-gr-desc">{book.description}</p>}

              {metaRows.length > 0 && (
                <div className="book-gr-meta">
                  {metaRows.map(({ label, value }) => (
                    <div key={label} className="book-gr-meta-row">
                      <span className="book-gr-meta-label">{label}</span>
                      <span className="book-gr-meta-value">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {moreBooks.length > 0 && (
            <div className="book-gr-more">
              <h2>More Books by {author.name}</h2>
              <div className="book-gr-more-grid">
                {moreBooks.map((b) => {
                  const bCoverUrl = typeof b.cover === "string" ? b.cover : (b.cover ? urlForImage(b.cover)?.url() : "/images/placeholder.svg");
                  return (
                    <Link key={b.id} href={`/books/${b.id}`} className="book-gr-more-item">
                      <div className="book-gr-more-cover">
                        <img src={bCoverUrl} alt={b.titleEN || b.titleML || "Book cover"} />
                      </div>
                      <div className="book-gr-more-title">{b.titleML}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer author={author} />
    </>
  );
}
