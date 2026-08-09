import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAuthorData } from "@/lib/sanityQueries";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  const author = await getAuthorData();

  return (
    <>
      <Navbar />
      <section
        className="section"
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>
            404
          </div>
          <h1 className="section-title" style={{ marginBottom: 16 }}>
            Page Not Found
          </h1>
          <p
            className="section-sub"
            style={{ maxWidth: 480, margin: "0 auto 32px" }}
          >
            The page you&apos;re looking for doesn&apos;t exist or may have
            been moved.
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/" className="btn btn-primary">
              Back to Home
            </Link>
            <Link href="/books" className="btn btn-ghost">
              Browse Books
            </Link>
          </div>
        </div>
      </section>
      <Footer author={author} />
    </>
  );
}
