"use client";
import { useState } from "react";
import { IconX } from "./Icons";

export default function Gallery({ gallery = [] }) {
  const [lightbox, setLightbox] = useState(null);
  const safeGallery = Array.isArray(gallery) ? gallery : [];

  return (
    <section className="section section-alt" id="gallery">
      <div className="container">
        <div className="gallery-grid">
          {safeGallery.map((item, i) => (
            <div
              key={item.id}
              className={`gallery-cell animate-on-scroll stagger-${(i % 4) + 1}`}
              style={item.width && item.height ? { aspectRatio: `${item.width} / ${item.height}` } : undefined}
              onClick={() => setLightbox(item)}
            >
              <img
                src={item.src}
                alt={item.caption}
                width={item.width || 800}
                height={item.height || 600}
                loading="lazy"
              />
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
