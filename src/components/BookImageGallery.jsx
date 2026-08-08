"use client";
import { useState } from "react";

export default function BookImageGallery({ images, alt, stockLabel, outOfStock }) {
  const [active, setActive] = useState(0);

  return (
    <div className="book-gr-cover-wrap">
      <span className={`book-gr-stock-pill ${outOfStock ? "out" : "in"}`}>{stockLabel}</span>
      <img src={images[active]} alt={alt} className="book-gr-cover" />

      {images.length > 1 && (
        <div className="book-gr-thumbs">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={`book-gr-thumb${i === active ? " active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
