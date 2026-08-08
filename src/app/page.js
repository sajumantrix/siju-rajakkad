import Link from "next/link";
import { getAuthorData, getBooksData } from "@/lib/sanityQueries";
import { defaultData } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Awards from "@/components/Awards";
import AuthorQuote from "@/components/AuthorQuote";
import Testimonials from "@/components/Testimonials";
import MediaCoverage from "@/components/MediaCoverage";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const revalidate = 60;

export default async function Home() {
  const authorData = await getAuthorData();
  const booksData = await getBooksData();
  
  // Reconstruct the full data object with fallbacks for non-modeled Sanity schema sections
  const data = { 
    ...defaultData, 
    author: authorData, 
    books: booksData 
  };

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.author.name,
    alternateName: data.author.nameML,
    description: data.author.tagline,
    image: data.author.portrait,
    url: "https://sijurajakkad.com",
    jobTitle: "Author",
    sameAs: [data.author.facebook, data.author.instagram].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Navbar />
      <main>
        <Hero author={data.author} />
        <About bio={data.bio} author={data.author} />
        
        {/* Books Teaser Banner */}
        <section className="section section-alt" id="books-teaser">
          <div className="container" style={{ textAlign: "center" }}>
            <h2 className="section-title">Explore the Books</h2>
            <p className="section-sub" style={{ margin: "0 auto 32px" }}>
              Discover novels, short story collections, and more by {data.author.name}.
            </p>
            <Link href="/books" className="btn btn-primary" style={{ padding: "14px 28px", fontSize: "1rem" }}>
              View All Books
            </Link>
          </div>
        </section>

        <Awards awards={data.awards} />
        <AuthorQuote author={data.author} />
        <Testimonials testimonials={data.testimonials} />
        <MediaCoverage media={data.media} />
        <Contact author={data.author} />
      </main>
      <Footer author={data.author} />
    </>
  );
}
