import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import { getAuthorData, getGalleryData } from "@/lib/sanityQueries";

export const metadata = {
  title: "Gallery",
  description: "Explore photos and moments from the literary journey of Siju Rajakkad.",
  alternates: { canonical: "/gallery" },
  openGraph: { title: "Gallery | Siju Rajakkad", url: "/gallery" },
};

export const revalidate = 60;

export default async function GalleryPage() {
  const authorData = await getAuthorData();
  const galleryData = await getGalleryData();

  return (
    <>
      <Navbar />
      <main className="page-main">
        <div className="container">
          <div className="section-header page-header">
            <h1 className="section-title">Photo Gallery</h1>
            <p className="section-sub" style={{ margin: "0 auto" }}>
              Moments, events, and memories from the literary journey.
            </p>
          </div>
          <Gallery gallery={galleryData} />
        </div>
      </main>
      <Footer author={authorData} />
    </>
  );
}
