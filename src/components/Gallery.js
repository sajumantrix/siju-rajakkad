"use client";
import { useState } from "react";
import { IconX } from "./Icons";

export default function Gallery({ gallery = [] }) {
  const [lightbox, setLightbox] = useState(null);
  const [filter, setFilter] = useState("All");
  const safeGallery = Array.isArray(gallery) ? gallery : [];
  const categories = ["All", ...new Set(safeGallery.map((g) => g.category).filter(Boolean))];
  const filtered = filter === "All" ? safeGallery : safeGallery.filter((g) => g.category === filter);

  return (
    <section className="section section-alt" id="gallery">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-label justify-center">Gallery</div>
          <h2 className="section-title">Moments</h2>
          <p className="section-sub mx-auto">From book launches, festivals, and literary events</p>
        </div>
        
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 text-sm font-semibold transition-all duration-300 rounded-full border ${
                  filter === cat
                    ? "bg-[#111111] text-white border-[#111111]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-900 hover:text-gray-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="gallery-grid">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className={`gallery-cell animate-on-scroll stagger-${(i % 4) + 1}`}
              onClick={() => setLightbox(item)}
            >
              <img src={item.src} alt={item.caption} />
              <div className="gallery-overlay">
                <span>{item.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`lightbox${lightbox ? " open" : ""}`} onClick={() => setLightbox(null)}>
        {lightbox && (
          <>
            <button className="lightbox-close" onClick={() => setLightbox(null)}>
              <IconX size={18} />
            </button>
            <img className="lightbox-img" src={lightbox.src} alt={lightbox.caption} />
            <div className="lightbox-caption">{lightbox.caption}</div>
          </>
        )}
      </div>
    </section>
  );
}
