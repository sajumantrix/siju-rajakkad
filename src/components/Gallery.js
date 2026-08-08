"use client";
import { useState } from "react";
import { IconX } from "./Icons";

export default function Gallery({ gallery = [] }) {
  const [lightbox, setLightbox] = useState(null);
  const safeGallery = Array.isArray(gallery) ? gallery : [];

  return (
    <section className="section section-alt" id="gallery">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-label justify-center">Gallery</div>
          <h2 className="section-title">Moments</h2>
          <p className="section-sub mx-auto">From book launches, festivals, and literary events</p>
        </div>
        
        <div className="gallery-grid">
          {safeGallery.map((item, i) => (
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
