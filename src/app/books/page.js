import Link from "next/link";
import { getAuthorData, getBooksData } from "@/lib/sanityQueries";
import { buildWhatsAppAskURL } from "@/lib/whatsapp";
import { urlForImage } from "@/sanity/image";
import { IconWhatsapp } from "@/components/Icons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function BooksListPage() {
  const authorData = await getAuthorData();
  const booksData = await getBooksData();
  const data = { author: authorData, books: booksData };

  return (
    <>
      <Navbar />
      <main className="books-list-page section">
        <div className="container">
          <div className="section-header text-center" style={{ maxWidth: 640, margin: "0 auto 40px" }}>
            <div className="section-label" style={{ justifyContent: "center" }}>Published Works</div>
            <h1 className="section-title">All Books</h1>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              Explore the complete collection of literary works by {data.author.name}
            </p>
          </div>

          {data?.books?.length === 0 ? (
            <p style={{ textAlign: "center", color: "var(--text-3)" }}>No books published yet. Check back soon.</p>
          ) : (
            <>
              <div className="books-list-toolbar">
                <span className="books-list-count">{data.books.length} {data.books.length === 1 ? "Item" : "Items"}</span>
              </div>

              <div className="books-list-container">
                {data.books.map((book) => {
                  const waAskURL = buildWhatsAppAskURL(data.author.whatsappNumber, book.titleML);
                  const coverUrl = typeof book.cover === "string" ? book.cover : (book.cover ? urlForImage(book.cover)?.url() : "/images/placeholder.jpg");
                  const outOfStock = book.inStock === false;

                  return (
                    <div key={book.id} className="book-list-item">
                      <Link href={`/books/${book.id}`} className="book-list-cover-link">
                        {outOfStock && <span className="book-list-badge out">Sold Out</span>}
                        <img src={coverUrl} alt={book.titleEN} className="book-list-cover" />
                      </Link>

                      <div className="book-list-body">
                        <div className="book-list-header">
                          <Link href={`/books/${book.id}`} className="book-list-title-ml">
                            {book.titleML}
                          </Link>
                          {book.titleEN && <div className="book-list-title-en">{book.titleEN}</div>}
                        </div>

                        <div className="book-list-author">by {data.author.name}</div>
                        <span className="book-list-price">{book.price ? `Rs. ${book.price}` : "Contact for price"}</span>

                        <div className="book-list-actions">
                          <Link href={`/books/${book.id}`} className="book-list-cta">
                            View Details
                          </Link>
                          <a
                            href={waAskURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="book-list-cta-icon"
                            aria-label="Ask about this book on WhatsApp"
                            title="Ask on WhatsApp"
                          >
                            <IconWhatsapp size={17} />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer author={data.author} />
    </>
  );
}
