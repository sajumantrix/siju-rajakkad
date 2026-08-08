import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import { getAuthorData, getGalleryData } from "@/lib/sanityQueries";

export const metadata = {
  title: "Gallery | Siju Rajakkad",
  description: "Explore photos and moments from the literary journey of Siju Rajakkad.",
};

export default async function GalleryPage() {
  const authorData = await getAuthorData();
  const galleryData = await getGalleryData();

  return (
    <>
      <Navbar />
      <main className="section pt-24 md:pt-[120px] min-h-[80vh] bg-[#f8f7f5]">
        <div className="container">
          <div className="section-header" style={{ marginBottom: "60px", textAlign: "center" }}>
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
