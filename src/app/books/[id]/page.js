import Link from "next/link";
import { getBookById, getAuthorData, getBooksData } from "@/lib/sanityQueries";
import { buildWhatsAppURL, buildWhatsAppEnquiryURL } from "@/lib/whatsapp";
import { urlForImage } from "@/sanity/image";
import { IconWhatsapp, IconChevronRight } from "@/components/Icons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function BookDetailPage({ params }) {
  const { id } = await params;

  const book = await getBookById(id);
  const author = await getAuthorData();
  const allBooks = await getBooksData();

  if (!book) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, fontFamily: "var(--font)" }}>
        <p style={{ fontSize: "1.1rem", color: "var(--text-2)" }}>Book not found.</p>
        <Link href="/books" className="btn btn-ghost">Back to Books</Link>
      </div>
    );
  }

  const outOfStock = book.inStock === false;
  const waURL = buildWhatsAppURL(author.whatsappNumber, book.titleML);
  const enquiryURL = buildWhatsAppEnquiryURL(author.whatsappNumber, book.titleML);
  const coverUrl = typeof book.cover === "string" ? book.cover : (book.cover ? urlForImage(book.cover)?.url() : "/images/placeholder.jpg");

  const metaRows = [
    { label: "Publisher", value: book.publisher },
    { label: "Published", value: book.year },
    { label: "Language", value: book.language },
    { label: "Format", value: book.stories },
  ].filter((m) => m.value);

  const moreBooks = allBooks.filter((b) => b.id !== book.id).slice(0, 6);

  return (
    <>
      <Navbar />
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
            <div className="book-gr-cover-wrap">
              <span className={`book-gr-stock-pill ${outOfStock ? "out" : "in"}`}>
                {outOfStock ? "Sold Out" : "In Stock"}
              </span>
              <img src={coverUrl} alt={book.titleEN} className="book-gr-cover" />
            </div>

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
            </div>
          </div>

          {moreBooks.length > 0 && (
            <div className="book-gr-more">
              <h2>More Books by {author.name}</h2>
              <div className="book-gr-more-grid">
                {moreBooks.map((b) => {
                  const bCoverUrl = typeof b.cover === "string" ? b.cover : (b.cover ? urlForImage(b.cover)?.url() : "/images/placeholder.jpg");
                  return (
                    <Link key={b.id} href={`/books/${b.id}`} className="book-gr-more-item">
                      <div className="book-gr-more-cover">
                        <img src={bCoverUrl} alt={b.titleEN} />
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
